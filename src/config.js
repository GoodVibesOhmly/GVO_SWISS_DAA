const configs = {
  development: {
    name: 'dev',
    apiGateway: {
      URL: 'http://localhost:5005',
    },
    ETH: {
      // rpcEndpoint: "https://ropsten.infura.io/v3/766661aa3a1e414584b9d2c2b73e6930",
      rpcEndpointXdai: 'https://rpc.xdaichain.com/',
    },
    bridgeAddress: '0x30f938fed5de6e06a9a7cd2ac3517131c317b1e7', // TODO
    CSSTKTokenAddress: '0x1A1CCA6c6A436f6B23e4dA99430f00F01688B00d', // this is on XDAI chain
    DAITokenAddress: '0xE690E380740a682E2b8CEAEa33584Ea2cb59849E', // ropsten ?
    ratio: 2.5, // how much CSTK you get for 1 DAI
    givethBridgeAddress: '0x279277482F13aeF92914317a0417DD591145aDc9',
    targetProjectId: 514,
    onboardApiKey: '818d425c-a8f6-4c11-bbbe-52eb6058877e',
    networkId: 3, // Ropsten
    rpcUrl: 'https://rinkeby.infura.io/v3/d5e29c9b9a9d4116a7348113f57770a8',
    appUrl: 'http://localhost:3000',
  },

  production: {
    name: 'prod',
    apiGateway: {
      URL: 'https://cs.datapinner.com', // TODO
    },
    ETH: {
      // rpcEndpoint: "https://mainnet.eth.cloud.ava.do",
      rpcEndpointXdai: 'https://rpc.xdaichain.com/',
    },
    bridgeAddress: '0x30f938fed5de6e06a9a7cd2ac3517131c317b1e7',
    CSSTKTokenAddress: '0xc4fbE68522ba81a28879763C3eE33e08b13c499E',
    ratio: 2,
  },
};
const config = process.env.REACT_APP_STAGE
  ? configs[process.env.REACT_APP_STAGE]
  : configs.development;

module.exports = config;
