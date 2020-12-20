import BigNumber from 'bignumber.js';
import config from '../config';

const INFINITE_ALLOWANCE = new BigNumber(2).pow(256).minus(1).toFixed();

const createAllowance = async (ERC20Cotract, account, amount) => {
  return ERC20Cotract.approve(config.givethBridgeAddress, amount)
    .send({ from: account })
    .on('transactionHash', () => {
      if (amount === 0) {
        // TODO: notification of 'You will be asked to make another transaction to set the correct allowance!'
      } else {
        // TODO: notification of 'You will be asked to make another transaction for your donation!'
      }
    });
};

const approveERC20tokenTransfer = async (ERC20Contract, account, amount = INFINITE_ALLOWANCE) => {
  const getAllowance = () => ERC20Contract.allowance(account, config.givethBridgeAddress).call();

  // read existing allowance for the givethBridge
  const allowance = await getAllowance();

  const amountNumber = new BigNumber(amount);
  const allowanceNumber = new BigNumber(allowance);

  // if no allowance, we set the allowance
  // if there's an existing allowance, but it's lower than the amount, we reset it and create a new allowance
  // in any other case, just continue

  let result = true;
  // TODO: find a better way to know that transaction is successful than the status field on response
  /* eslint-disable eqeqeq */
  if (allowanceNumber.isZero()) {
    result = (await createAllowance(ERC20Contract, account, amount)).status;
  } else if (amountNumber.gt(allowanceNumber)) {
    // return _createAllowance(web3, etherScanUrl, ERC20, account, 0);
    result = (await createAllowance(ERC20Contract, account, 0)).status;
    if (result) {
      result = (await createAllowance(ERC20Contract, account, amount)).status;
    }
  }
  return result;
};

export default {
  approveERC20tokenTransfer,
};
