import moment from 'moment';

const initialState = {
  eventForm: {
    status: null,
    data: {
      firstName: '',
      lastName: '',
      email: '',
      eventDate: moment().utc().toISOString(),
    },
    changed: false,
    errors: null,
    waiting: false,
  },
};

export default initialState;
