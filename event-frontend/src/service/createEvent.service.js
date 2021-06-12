import axios from 'axios';

import endpoints from './endpoints';

const createEvent = (payload) => {
  const endpoint = endpoints.CREATE_EVENT;
  return axios.post(endpoint, payload);
};

export default createEvent;
