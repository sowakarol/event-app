import axios from 'axios';

// TODO move to some kind of config service
const apiEndpoint = 'http://localhost:5000';

const createEvent = (payload) => {
  const endpoint = `${apiEndpoint}/api/v1/events/`;
  console.info(`Sending request to ${endpoint}`, payload);
  return axios.post(endpoint, payload);
};

export default createEvent;
