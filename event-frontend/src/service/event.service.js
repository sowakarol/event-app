import axios from "axios";

class EventApiDataService {
  constructor() {
    // TODO move to some kind of config service
    this.apiEndpoint = "http://localhost:5000";
  }

  create(payload) {
    const endpoint = `${this.apiEndpoint}/api/v1/events/`;
    console.info(`Sending request to ${endpoint}`, payload);
    return axios.post(endpoint, payload);
  }
}

export default new EventApiDataService();
