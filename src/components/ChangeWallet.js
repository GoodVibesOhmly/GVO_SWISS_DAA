import React, { useContext } from 'react';
import { OnboardContext } from './OnboardProvider';

const ChangeWallet = () => {
  const { web3, onboard, address, changeWallet } = useContext(OnboardContext);

  if (onboard && web3 && address) {
    return (
      <button type="button" className="button is-outlined is-success mx-3" onClick={changeWallet}>
        Connect Wallet
      </button>
    );
  }
  return null;
};

export default ChangeWallet;
