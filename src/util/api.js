const axios = require('axios');
const config = require('../config');

export default {
  getSignature: (address, type) => {
    return axios.get(`${config.apiGateway.URL}/signature/${address}_${type}`);
  },

  getUserWhiteListed: async address => {
    const res = await axios.get(`${config.apiGateway.URL}/whitelist/${address}`);
    return !!res && !!res.data && !!res.data.whitelisted;
  },

  getMaxTrust: async address => {
    const res = await axios.get(`${config.apiGateway.URL}/maxtrust/${address}`);
    return res.data.maxtrust;
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
