import config from '../config';
import GivethBridge from './contracts/GivethBridge';

const status = {
  NOTHING: 1,
  SUCCESSFUL: 2,
  CANCELED: 3, // Replaced by different transaction with same nonce
};

/**
 * @return {boolean} success whether the transaction is successful or replaced by different tx
 */
const monitorTransaction = async (web3, originalTransactionHash, donateAmount) => {
  const { from, nonce } = await web3.eth.getTransaction(originalTransactionHash);
  let subscription;
  let finish = false;

  const cancelMonitor = () => {
    if (subscription) {
      subscription.unsubscribe();
      subscription = undefined;
    }
    finish = true;
  };

  const fromBlock = await web3.eth.getBlockNumber();
  const givethBridge = new GivethBridge(web3, config.givethBridgeAddress);

  const checkTransactionIsDone = async () => {
    const transactionCount = await web3.eth.getTransactionCount(from);

    if (transactionCount > nonce) {
      const events = await givethBridge.contract.getPastEvents('DonateAndCreateGiver', {
        fromBlock,
        toBlock: 'latest',
      });

      const found = events.some(e => {
        const { giver, receiverId, token, amount } = e.returnValues;
        return (
          giver === from &&
          Number(receiverId) === config.targetProjectId &&
          token === config.DAITokenAddress &&
          amount === donateAmount
        );
      });

      return found ? status.SUCCESSFUL : status.CANCELED;
    }

    return status.NOTHING;
  };

  const promise = new Promise(resolve => {
    const poll = setInterval(() => {
      if (finish) {
        resolve(false);
        clearInterval(poll);
      }
    }, 100);

    subscription = web3.eth
      .subscribe('newBlockHeaders')
      .on('data', block => {
        if (!block.number) return;

        checkTransactionIsDone()
          .then(result => {
            if (result === status.SUCCESSFUL) {
              resolve(true);
            } else if (result === status.CANCELED) {
              resolve(false);
            }
          })
          .catch(console.error);
      })
      .on('error', err => console.error('SUBSCRIPTION ERROR: ', err));
  });

  return { promise, cancelMonitor };
};

export default monitorTransaction;
