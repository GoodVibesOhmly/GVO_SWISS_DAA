import Web3 from 'web3';
import registryABI from './Registry.json';

const config = require('../../config');

class Registry {
  constructor() {
    this.web3 = new Web3(config.ETH.rpcEndpointXdai);
    this.registryContract = new this.web3.eth.Contract(registryABI, config.registryAddress);
  }

  get contract() {
    return this.registryContract;
  }
}

export default Registry;
