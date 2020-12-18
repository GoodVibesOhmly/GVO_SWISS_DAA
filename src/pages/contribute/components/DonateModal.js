import React, { useContext, useEffect, useState } from 'react';
import ERC20Contract from 'erc20-contract-js';
import config from '../../../config';
import GivethBridge from '../../../blockchain/contracts/GivethBridge';
import './DonateModal.sass';
import { OnboardContext } from '../../../components/OnboardProvider';
import AllowanceHelper from '../../../blockchain/allowanceHelper';
import spinner from "../../../assets/spinner.svg";
import Success from './Success';

const VIEW_STATES = {
  READY_TO_APPROVE: 'READY_TO_APPROVE',
  APPROVING: 'APPROVING',
  APPROVE_FAILED: 'APPROVE_FAILED',
  ENOUGH_ALLOWANCE: 'ENOUGH_ALLOWANCE',
  DONATING: 'DONATING',
  DONATING_FAILED: 'DONATING_FAILED',
  DONATING_SUCCESS: 'DONATING_SUCCESS',
};

const DonateModal = props => {
  const { onClose, amount } = props;
  const { web3, address, network } = useContext(OnboardContext);
  const { ENOUGH_ALLOWANCE, READY_TO_APPROVE,
    APPROVING, APPROVE_FAILED, DONATING, DONATING_FAILED, DONATING_SUCCESS } = VIEW_STATES;

  const toBN = value => new web3.utils.BN(value);

  // Amount in wei in BN type
  const amountWei = web3.utils.toWei(amount.toString());
  const amountBN = toBN(amountWei);

  const [allowance, setAllowance] = useState('0');
  const [loading, setLoading] = useState(true);
  const [viewState, setViewState] = useState();

  const { DAITokenAddress, givethBridgeAddress } = config;
  let daiTokenContract;
  let givethBridge;

  daiTokenContract = new ERC20Contract(web3, DAITokenAddress);
  givethBridge = new GivethBridge(web3, givethBridgeAddress);
  useEffect(() => {
    setLoading(true);
    daiTokenContract = new ERC20Contract(web3, DAITokenAddress);
    givethBridge = new GivethBridge(web3, givethBridgeAddress);
    setLoading(false);
  }, [web3]);

  useEffect(() => {
    if (network !== config.networkId) onClose();
  }, [network]);

  const updateAllowance = async () => {
    return daiTokenContract
      .allowance(address, givethBridgeAddress)
      .call()
      .then(value => setAllowance(value));
  };

  useEffect(() => {
    setLoading(true);
    if (web3) {
      daiTokenContract
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
    setViewState(amountBN.gt(toBN(allowance)) ? READY_TO_APPROVE : ENOUGH_ALLOWANCE);
    // eslint-disable-next-line
  }, [allowance, amount, READY_TO_APPROVE, ENOUGH_ALLOWANCE]);

  if (!web3) return null;

  const approve = async () => {
    setViewState(APPROVING);
    try {
      await AllowanceHelper.approveERC20tokenTransfer(daiTokenContract, address);
      updateAllowance();
    } catch (e) {
      setViewState(APPROVE_FAILED);
      console.error(e);
      updateAllowance();
    }
  };

  const donate = async () => {
    setViewState(DONATING);
    try {
      await givethBridge.donateAndCreateGiver(address, config.targetProjectId, DAITokenAddress, amountWei);
      setViewState(DONATING_SUCCESS);
    } catch (e) {
      setViewState(DONATING_FAILED);
    }
  };

  const content_READY_TO_APPROVE = (
    <>
      <p>You first need to approve access to your DAI balance and then donate</p>
      <p>Allowance needed: {amount} DAI</p>
      <p>Current Allowance: {web3.utils.fromWei(allowance, "ether")} DAI</p>
    </>
  )

  const content_APPROVING = (
    <>
      <figure class="image is-32x32">
        <img src={spinner} />
      </figure>
      <p>approving...</p>
    </>
  )

  const content_APPROVE_FAILED = (
    <>
      <p>approve failed!</p>
    </>
  )

  const content_ENOUGH_ALLOWANCE = (
    <>
      <p>Ready to send donation</p>
      <p>Press the conate button to execute the donation</p>
    </>
  )


  const content_DONATING = (
    <>
      <figure class="image is-32x32">
        <img src={spinner} />
      </figure>
      <p>waiting for donation transction to complete...</p>
    </>
  )

  const content_DONATING_FAILED = (
    <>
      <p>donating failed :(</p>
    </>
  )

  const content_DONATING_SUCCESS = (
    <>
      <Success/>
    </>
  )


  const modalContent = () => {
    switch (viewState) {
      case "READY_TO_APPROVE":
        return content_READY_TO_APPROVE;
      default:
        return null;
    }
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


          {/* {modalContent()} */}

          {/* This is to show all states in one screen  - should be replaces  bythe function above modalContent() 
          in the final version after Kay has done his work ! */}
          <hr />
          {content_READY_TO_APPROVE}
          <hr />
          {content_APPROVING}
          <hr />
          {content_APPROVE_FAILED}
          <hr />
          {content_ENOUGH_ALLOWANCE}
          <hr />
          {content_DONATING}
          <hr />
          {content_DONATING_FAILED}
          <hr />
          {content_DONATING_SUCCESS}

        </section>
        <footer className="modal-card-foot">
          {!loading && viewState !== ENOUGH_ALLOWANCE && (
            <button
              className="button is-primary"
              disabled={viewState !== ENOUGH_ALLOWANCE}
              onClick={approve}
            >
              Approve
            </button>
          )}
          <button
            className={`button is-success ${loading ? 'is-loading' : ''}`}
            disabled={viewState !== ENOUGH_ALLOWANCE}
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
