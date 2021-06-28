/**
 * @return {boolean} success whether the transaction is successful
 */
const monitorTransaction = async (web3, _to, _value, erc20contract) => {
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

  const checkTransactionIsDone = async () => {
    const events = await erc20contract.peTransfer({
      fromBlock,
      toBlock: 'latest',
      filter: {
        _to,
        _value,
      },
    });

    return events.length > 0;
  };

  const promise = new Promise(resolve => {
    const poll = setInterval(() => {
      if (finish) {
        resolve(false);
        clearInterval(poll);
      }
    }, 100);

    subscription = web3.eth
      .subscribe('logs', {}, () => {
        checkTransactionIsDone()
          .then(result => {
            if (result) {
              resolve(true);
            } else {
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
