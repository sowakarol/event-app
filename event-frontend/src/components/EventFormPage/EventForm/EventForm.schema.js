import * as yup from 'yup';

const EventFormSchema = yup.object().shape({
  firstName: yup.string()
    .required('First Name is required'),

  lastName: yup.string()
    .required('Last Name is required'),

  email: yup.string().email()
    .required('Email is required'),

  eventDate: yup.date()
    .required('Event Date is required'),
});

export default EventFormSchema;
