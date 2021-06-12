import React, { useCallback, useState } from 'react';
import { Formik, Form } from 'formik';
import moment from 'moment';
import { TextField, Button } from '@material-ui/core';

import '../styles.css';
import EventFormSchema from './EventForm.schema';
import DateTimePickerField from './DateTimePickerField';
import createEvent from '../../../service/createEvent.service';
import SuccessDashboard from './SuccessDashboard';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const EventForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onFulfillFormAgainClick = useCallback(() => {
    setIsSuccess(false);
  }, []);

  const submitForm = useCallback(async (values, { setFieldError, resetForm }) => {
    setErrorMessage(null);
    try {
      const response = await createEvent(values);

      if (response.status === 201) {
        resetForm({});
        setIsSuccess(true);
        return;
      }

      throw new Error('Ooops, something went wrong!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const validationErrors = (error.response.data && error.response.data.errors) || [];
        validationErrors.forEach((validationError) => {
          if (Object.keys(values).includes(validationError.field)) {
            setFieldError(validationError.field, validationError.message);
          }
        });
      }
      setErrorMessage(error.message);
    }
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          eventDate: moment().utc().toISOString(),
        }}
        validationSchema={EventFormSchema}
        onSubmit={submitForm}
      >
        {({
          values, handleChange, touched, errors, isSubmitting,
        }) => (isSuccess ? (
          <SuccessDashboard onFulfillFormAgainClick={onFulfillFormAgainClick} />
        ) : (
          <Form className="center">
            <div className="FormField">
              <TextField
                id="firstName"
                label="First Name"
                type="text"
                className="FormField"
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={errors.firstName && errors.firstName}
                required
                fullWidth
              />
            </div>

            <div className="FormField">
              <TextField
                id="lastName"
                label="Last Name"
                type="text"
                className="FormField"
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={errors.lastName && errors.lastName}
                required
                fullWidth
              />
            </div>
            <div className="FormField">
              <TextField
                id="email"
                name="email"
                label="Email"
                className="FormField"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                required
                fullWidth
              />
            </div>
            <div className="FormField">
              <DateTimePickerField
                id="eventDate"
                label="Event date"
                name="eventDate"
                required
                fullWidth
              />
            </div>
            <div className="SubmitButton">
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                disabled={isSubmitting}
              >
                Create Event
              </Button>
            </div>
            {isSubmitting && <LoadingSpinner isOpen />}
            {errorMessage || null}
          </Form>
        ))}
      </Formik>
    </div>
  );
};

export default EventForm;
