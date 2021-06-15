import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import { connect } from 'react-redux';
import { initOnboard } from '../blockchain/onboard';
import Cstk from '../assets/cstk.png';

export const OnboardContext = createContext({});

const Comp = ({ onWeb3Ready, children }) => {
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const [wallet, setWallet] = useState({});
  const [web3, setWeb3] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const [onboard, setOnboard] = useState(null);

  useEffect(() => {
    const onboardInstance = initOnboard({
      address: add => {
        setAddress(add);
      },
      network: setNetwork,
      wallet: _wallet => {
        if (_wallet.provider) {
          setWallet(_wallet);
          const _web3 = new Web3(_wallet.provider);
          setWeb3(_web3);

          window.localStorage.setItem('selectedWallet', _wallet.name);
        } else {
          setWallet({});
          setWeb3(null);
        }
      },
    });

    setOnboard(onboardInstance);
  }, [onWeb3Ready]);

  useEffect(() => {
    onWeb3Ready(web3);
  }, [onWeb3Ready, web3]);

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem('selectedWallet');

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

  const checkIsReady = async () => {
    let ready = false;
    if (onboard && web3 && address) {
      ready = await onboard.walletCheck();
    }
    setIsReady(ready);
    return ready;
  };

  const addCSTK = async () => {
    const provider = window.web3.currentProvider;
    await provider.request({
      method: 'metamask_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: '0xc4fbE68522ba81a28879763C3eE33e08b13c499E',
          symbol: 'CSTK',
          decimals: 0,
          image: Cstk,
        },
      },
    });
  };

  const addCSLove = async () => {
    const provider = window.web3.currentProvider;
    await provider.request({
      method: 'metamask_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: '0x4D64A862e0eFb94b1d2A84A67F7a2d669AFA8eDf',
          symbol: 'CSLOVE',
          decimals: 0,
          image: Cstk,
        },
      },
    });
  };

  useEffect(() => {
    const check = async () => {
      let ready = false;
      if (onboard && web3 && address) {
        ready = await onboard.walletCheck();
      }
      setIsReady(ready);
      return ready;
    };
    check();
  }, [onboard, web3, address, network]);

  const changeWallet = () => {
    if (onboard) {
      onboard.walletSelect().then(walletSelected => {
        if (walletSelected) onboard.walletCheck();
      });
    }
  };

  return (
    <OnboardContext.Provider
      value={{
        web3,
        wallet,
        address,
        network,
        onboard,
        isReady,
        addCSTK,
        addCSLove,
        checkIsReady,
        changeWallet,
      }}
    >
      {children}
    </OnboardContext.Provider>
  );
};

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    onWeb3Ready: web3 => dispatch({ type: 'WEB3_AVAILABLE', web3 }),
  };
};

export const OnboardProvider = connect(mapStateToProps, mapDispatchToProps)(Comp);
