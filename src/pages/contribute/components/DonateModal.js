import React, { useContext, useEffect, useState, useRef } from 'react';
import ERC20Contract from 'erc20-contract-js';
import config from '../../../config';
import GivethBridge from '../../../blockchain/contracts/GivethBridge';
import './DonateModal.sass';
import { OnboardContext } from '../../../components/OnboardProvider';
import AllowanceHelper from '../../../blockchain/allowanceHelper';

const ALLOWANCE_STATES = {
  ENOUGH: 'ENOUGH',
  NOT_ENOUGH: 'NOT_ENOUGH',
  TO_APPROVE: 'TO_APPROVE',
};

const DonateModal = props => {
  const { onClose, amount } = props;
  const { web3, address, network } = useContext(OnboardContext);
  const { ENOUGH, NOT_ENOUGH, TO_APPROVE } = ALLOWANCE_STATES;

  const toBN = value => new web3.utils.BN(value);

  // Amount in wei in BN type
  const amountWei = web3.utils.toWei(amount.toString());
  const amountBN = toBN(amountWei);

  const [allowance, setAllowance] = useState('0');
  const [loading, setLoading] = useState(true);
  const [allowanceState, setAllowanceState] = useState(ENOUGH);

  const { DAITokenAddress, givethBridgeAddress } = config;
  const daiTokenContract = useRef(new ERC20Contract(web3, DAITokenAddress));
  const givethBridge = useRef(new GivethBridge(web3, givethBridgeAddress));

  useEffect(() => {
    setLoading(true);
    daiTokenContract.current = new ERC20Contract(web3, DAITokenAddress);
    givethBridge.current = new GivethBridge(web3, givethBridgeAddress);
    setLoading(false);
  }, [web3, DAITokenAddress, givethBridgeAddress]);

  useEffect(() => {
    if (network !== config.networkId) onClose();
  }, [network, onClose]);

  const updateAllowance = async () => {
    return daiTokenContract.current
      .allowance(address, givethBridgeAddress)
      .call()
      .then(value => setAllowance(value));
  };

  useEffect(() => {
    setLoading(true);
    if (web3) {
      daiTokenContract.current
        .allowance(address, givethBridgeAddress)
        .call()
        .then(value => {
          setAllowance(value);
          setLoading(false);
        })
        .catch(e => {
          console.error(e);
        });
    }
    // eslint-disable-next-line
  }, [web3, address, amount]);

  useEffect(() => {
    setAllowanceState(amountBN.gt(toBN(allowance)) ? NOT_ENOUGH : ENOUGH);
    // eslint-disable-next-line
  }, [allowance, amount, NOT_ENOUGH, ENOUGH]);

  if (!web3) return null;

  const approve = async () => {
    await setAllowanceState(TO_APPROVE);
    try {
      await AllowanceHelper.approveERC20tokenTransfer(daiTokenContract.current, address);
      updateAllowance();
    } catch (e) {
      console.error(e);
      updateAllowance();
    }
  };

  const donate = () => {
    givethBridge.current.donateAndCreateGiver(
      address,
      config.targetProjectId,
      DAITokenAddress,
      amountWei,
    );
    onClose();
  };

  return (
    <div className="donate-modal modal is-active">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Contribute</p>
          <button className="delete" aria-label="close" onClick={onClose} />
        </header>
        <section className="modal-card-body">
          <p>Amount: {amount}</p>
          <p>Allowance: {web3.utils.fromWei(allowance)}</p>
        </section>
        <footer className="modal-card-foot">
          {!loading && allowanceState !== ENOUGH && (
            <button
              className="button is-primary"
              disabled={allowanceState === TO_APPROVE}
              onClick={approve}
            >
              Approve
            </button>
          )}
          <button
            className={`button is-success ${loading ? 'is-loading' : ''}`}
            disabled={allowanceState !== ENOUGH}
            onClick={donate}
          >
            Donate
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DonateModal;
