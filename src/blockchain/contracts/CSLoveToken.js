import Web3 from 'web3';
import ERC20Contract from 'erc20-contract-js';

const config = require('../../config');

class CSLoveToken {
  constructor() {
    this.web3 = new Web3(config.ETH.rpcEndpointRinkeby);
    this.erc20Contract = new ERC20Contract(this.web3, config.CSLoveTokenAddress);
  }

  get contract() {
    return this.erc20Contract;
  }
}

export default CSLoveToken;
