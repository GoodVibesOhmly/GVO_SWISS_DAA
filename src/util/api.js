const axios = require('axios');
const config = require('../config');

export default {
  getSignature: address => {
    return axios.get(`${config.apiGateway.URL}/signature/${address}`);
  },

  getUserWhiteListed: async address => {
    const res = await axios.get(`${config.apiGateway.URL}/whitelist/${address}`);
    return !!res && !!res.data && !!res.data.whitelisted;
  },

  postSignature: (message, signature, address) => {
    return axios.post(`${config.apiGateway.URL}/signature`, {
      message,
      address,
      signature,
    });
  },
};
