import React, { useContext } from 'react';
import { OnboardContext } from './OnboardProvider';

const WalletButton = () => {
  const { web3, onboard, address } = useContext(OnboardContext);

  if (!web3 || !address) {
    return (
      <button
        type="button"
        className="button is-outlined is-success"
        onClick={() => {
          if (onboard) {
            onboard.walletSelect().then(walletSelected => {
              if (walletSelected) {
                onboard.walletCheck();
              }
            });
          } else {
            // console.error('onboard is not loaded!');
          }
        }}
      >
        Connect Wallet
      </button>
    );
  }
  return null;
};

export default WalletButton;
