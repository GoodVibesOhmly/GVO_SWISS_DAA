import React, { useContext } from 'react';
import { OnboardContext } from './OnboardProvider';

const ChangeWallet = () => {
  const { web3, onboard, address, changeWallet } = useContext(OnboardContext);

  return (
    onboard &&
    web3 &&
    address && (
      <button type="button" className="button is-outlined is-success mx-3" onClick={changeWallet}>
        Change Wallet
      </button>
    )
  );
};

export default ChangeWallet;
