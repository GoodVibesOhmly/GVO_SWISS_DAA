const axios = require('axios');
const config = require('../config');

export default {
  getSignature: (address, type) => {
    return axios.get(`${config.apiGateway.URL}/signature/${address}_${type}`);
  },

  postSignature: (message, signature, address, type) => {
    return axios.post(`${config.apiGateway.URL}/signature`, {
      type,
      message,
      address,
      signature,
    });
  },
};
