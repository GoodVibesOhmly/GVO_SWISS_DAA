const configs = {
  development: {
    name: 'dev',
    apiGateway: {
      URL: 'https://cs.datapinner.com',
    },
    ETH: {
      // rpcEndpoint: "https://ropsten.infura.io/v3/766661aa3a1e414584b9d2c2b73e6930",
      rpcEndpointXdai: 'https://rpc.xdaichain.com/',
      rpcEndpointRinkeby: 'https://rinkeby.infura.io/v3/562a234e32b3428c8177872117142691',
    },
    CSSTKTokenAddress: '0xc4fbE68522ba81a28879763C3eE33e08b13c499E', // XDAI
    CSLoveTokenAddress: '0x4D64A862e0eFb94b1d2A84A67F7a2d669AFA8eDf', // Rinkeby
    DAITokenAddress: '0xE690E380740a682E2b8CEAEa33584Ea2cb59849E', // Ropsten
    registryAddress: '0x28512FB7681c8615aef25a8EF3bcb90aFAC502cB', // XDAI
    ratio: 2.5, // how much CSTK you get for 1 DAI
    givethBridgeAddress: '0x279277482F13aeF92914317a0417DD591145aDc9',
    targetProjectId: 514,
    onboardApiKey: '818d425c-a8f6-4c11-bbbe-52eb6058877e',
    networkId: 3, // Ropsten
    rpcUrl: 'https://rinkeby.infura.io/v3/d5e29c9b9a9d4116a7348113f57770a8',
    appUrl: 'http://localhost:3000',
    defaultContribution: 900,
    minimumContribution: {
      nonMember: 450,
      member: 1,
    },
  },

  production: {
    name: 'prod',
    apiGateway: {
      URL: 'https://cs.datapinner.com',
    },
    ETH: {
      // rpcEndpoint: "https://mainnet.eth.cloud.ava.do",
      rpcEndpointXdai: 'https://rpc.xdaichain.com/',
      rpcEndpointRinkeby: 'https://rinkeby.infura.io/v3/562a234e32b3428c8177872117142691',
    },
    CSSTKTokenAddress: '0xc4fbE68522ba81a28879763C3eE33e08b13c499E', // XDAI
    CSLoveTokenAddress: '0x4D64A862e0eFb94b1d2A84A67F7a2d669AFA8eDf', // Rinkeby
    DAITokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f', // Mainnet
    registryAddress: '0x28512FB7681c8615aef25a8EF3bcb90aFAC502cB', // XDAI
    ratio: 2.5, // how much CSTK you get for 1 DAI
    givethBridgeAddress: '0x30f938fED5dE6e06a9A7Cd2Ac3517131C317B1E7',
    targetProjectId: 2349, // verified 29/12/2020
    onboardApiKey: '25c39144-b224-4275-954c-e6e708b236e9',
    networkId: 1, // Mainnet
    // rpcUrl: 'https://rinkeby.infura.io/v3/d5e29c9b9a9d4116a7348113f57770a8',
    appUrl: 'http://localhost:3000',
    defaultContribution: 900,
    minimumContribution: {
      nonMember: 450,
      member: 1,
    },
  },
};
const config = process.env.REACT_APP_STAGE
  ? configs[process.env.REACT_APP_STAGE]
  : configs.development;

module.exports = config;
