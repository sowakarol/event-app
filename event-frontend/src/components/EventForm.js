import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { updateEventFormField } from "../actions/eventActions";
import {
  getEventForm,
  getHasChanged,
  getIsSaved,
  getIsWaiting,
  getErrors,
} from "../reducers/selectors";
import { saveForm, initForm } from "../reducers/thunk";
import {
  TextField,
  Grid,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import "./styles.css";

const mapStateToProps = (state) => ({
  eventForm: getEventForm(state),
  errors: getErrors(state),
  hasChanged: getHasChanged(state),
  isSaved: getIsSaved(state),
  isWaiting: getIsWaiting(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateEventFormField: (fieldName, fieldValue) =>
    dispatch(updateEventFormField(fieldName, fieldValue)),
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
      errors,
      isSaved,
      isWaiting,
    } = this.props;

    if (isSaved) {
      return (
        <div className="center">
          <h2>Congratulation! Event is saved</h2>
          <br />
          <Button
            onClick={this.props.initForm}
            variant="outlined"
            color="primary"
          >
            Create another event
          </Button>
        </div>
      );
    }

    const loader = (isOpen) => (
      <Backdrop open={isOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

    if (!eventForm) {
      return loader(!eventForm);
    }

    const errorMessages = errors || [];

    return (
      <div className="EventForm">
        <form onSubmit={this.submitForm(firstName, lastName, email, eventDate)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="first-name"
                label="First Name"
                value={this.props.firstName}
                onChange={this.changeFirstName}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="text"
                id="last-name"
                label="Last Name"
                value={this.props.lastName}
                onChange={this.changeLastName}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                id="email"
                label="Email"
                value={this.props.email}
                onChange={this.changeEmail}
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
                disabled={isWaiting}
                variant="outlined"
                color="primary"
              >
                Save Event
              </Button>
            </Grid>
            <Grid item xs={12}>
              {
                <div className="error">
                  {errorMessages.map((msg) => {
                    return (
                      <div key={msg}>
                        <span>Error: {msg}</span>
                        <br />
                      </div>
                    );
                  })}
                </div>
              }
            </Grid>
          </Grid>
        </form>
        {isWaiting && loader(isWaiting)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
