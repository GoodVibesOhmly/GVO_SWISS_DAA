import Web3 from 'web3';
import ERC20Contract from 'erc20-contract-js';

const config = require('../../config');

class CSTKToken {
  constructor() {
    this.web3 = new Web3(config.ETH.rpcEndpointXdai);
    this.erc20Contract = new ERC20Contract(this.web3, config.CSSTKTokenAddress);
  }

  get contract() {
    return this.erc20Contract;
  }
}

export default CSTKToken;
