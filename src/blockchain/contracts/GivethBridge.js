import GivethBridge from './GivethBridge.json';

class BridgeContract {
  constructor(web3, address) {
    this.contract = new web3.eth.Contract(GivethBridge.compilerOutput.abi, address);
  }

  donateAndCreateGiver(giver, receivedId, token, amount) {
    // donateAndCreateGiver(address giver, uint64 receiverId, address token, uint _amount)
    return this.contract.methods
      .donateAndCreateGiver(giver, receivedId, token, amount)
      .send({ from: giver });
  }
}

export default BridgeContract;
