import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { updateEventFormField } from "../actions/eventActions";
import { getEventForm, getHasChanged } from "../reducers/selectors";
import { saveForm, initForm } from "../reducers/thunk";
import { TextField, Grid, Button } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import "./styles.css";

// taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const validate = (values) => {
  const errors = {};
  const requiredFields = ["firstName", "lastName", "email", "eventDate"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values.email && !validateEmail(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  eventForm: getEventForm(state),
  hasChanged: getHasChanged(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateEventFormField: (fieldName, fieldValue) =>
    dispatch(updateEventFormField(fieldName, fieldValue)),
  discardChanges: () => dispatch(initForm()),
  onSubmit: () => dispatch(saveForm()),
  initForm: () => dispatch(initForm()),
});

class EventForm extends Component {
  constructor() {
    super();

    this.changeFirstName = (event) => {
      this.props.updateEventFormField("firstName", event.target.value);
    };
    this.changeLastName = (event) =>
      this.props.updateEventFormField("lastName", event.target.value);
    this.changeEmail = (event) =>
      this.props.updateEventFormField("email", event.target.value);
    this.changeEventDate = (newEventDate) => {
      const newDate = moment(newEventDate).utc();
      this.props.updateEventFormField("eventDate", newDate.toISOString());
    };
    this.submitForm = (firstName, lastName, email, eventDate) => (event) => {
      // do not reload page
      event.preventDefault();
      validate({ firstName, lastName, email, eventDate });
      this.props.onSubmit();
    };
  }
  componentWillMount() {
    this.props.initForm();
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      eventDate,
      eventForm,
      hasChanged,
    } = this.props;
    if (!eventForm) {
      return <p>LOADING</p>;
    }

    return (
      <div className="EventForm">
        {this.props.errors}

        <form onSubmit={this.submitForm(firstName, lastName, email, eventDate)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="first-name"
                placeholder="First Name"
                value={this.props.firstName}
                onChange={this.changeFirstName}
                // error={this.props.errors}
                // helperText={this.props.errors.firstName}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="text"
                id="last-name"
                placeholder="Last Name"
                value={this.props.lastName}
                onChange={this.changeLastName}
                // error={this.props.errors}
                // helperText={this.props.errors.firstName}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                id="email"
                placeholder="Email"
                value={this.props.email}
                onChange={this.changeEmail}
                // error={this.props.errors}
                // helperText={this.props.errors.firstName}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <DateTimePicker
                label="Event date"
                values={this.props.eventDate}
                onChange={this.changeEventDate}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={this.props.inProgress}
                variant="outlined"
                color="primary"
              >
                Save Event
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
