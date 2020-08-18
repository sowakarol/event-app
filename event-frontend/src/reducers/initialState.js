import moment from "moment";

export default {
  eventForm: {
    status: null,
    data: {
      firstName: "",
      lastName: "",
      email: "",
      eventDate: moment().utc().toISOString(),
    },
    changed: false,
    errors: null,
  },
};
