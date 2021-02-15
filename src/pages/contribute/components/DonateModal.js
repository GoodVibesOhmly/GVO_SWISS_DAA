import React, { useContext, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import ERC20Contract from 'erc20-contract-js';
import Web3 from 'web3';
import { Player } from '@lottiefiles/react-lottie-player';
import config from '../../../config';
import GivethBridge from '../../../blockchain/contracts/GivethBridge';
// import './DonateModal.sass';
import { OnboardContext } from '../../../components/OnboardProvider';
import AllowanceHelper from '../../../blockchain/allowanceHelper';
import spinner from '../../../assets/spinner.svg';
import Success from './Success';
import DAI from '../../../assets/dai.svg';
import CSTK from '../../../assets/cstk.svg';

const { DAITokenAddress, givethBridgeAddress } = config;

const VIEW_STATES = {
  VIEW_LOADING: 'LOADING',
  VIEW_READY_TO_APPROVE: 'READY_TO_APPROVE',
  VIEW_APPROVING: 'APPROVING',
  VIEW_APPROVE_FAILED: 'APPROVE_FAILED',
  VIEW_ENOUGH_ALLOWANCE: 'ENOUGH_ALLOWANCE',
  VIEW_DONATING: 'DONATING',
  VIEW_DONATING_FAILED: 'DONATING_FAILED',
  VIEW_DONATING_SUCCESS: 'DONATING_SUCCESS',
};

const {
  VIEW_DONATING_SUCCESS,
  VIEW_ENOUGH_ALLOWANCE,
  VIEW_DONATING_FAILED,
  VIEW_READY_TO_APPROVE,
  VIEW_LOADING,
  VIEW_APPROVING,
  VIEW_APPROVE_FAILED,
  VIEW_DONATING,
} = VIEW_STATES;

const ACTIONS = {
  ACTION_INIT: 'INIT',
  ACTION_UPDATE_AMOUNT: 'UPDATE_AMOUNT',
  ACTION_UPDATE_ALLOWANCE: 'UPDATE_ALLOWANCE',
  ACTION_APPROVE_ALLOWANCE: 'APPROVE_ALLOWANCE',
  ACTION_CLEAR_ALLOWANCE: 'CLEAR_ALLOWANCE',
  ACTION_ALLOWANCE_FAIL: 'ALLOWANCE_FAIL',
  ACTION_CLEAR_ALLOWANCE_SUCCESS: 'CLEAR_ALLOWANCE_SUCCESS',
  ACTION_APPROVE_ALLOWANCE_SUCCESS: 'APPROVE_ALLOWANCE_SUCCESS',
  ACTION_APPROVE_ALLOWANCE_FAIL: 'APPROVE_ALLOWANCE_FAIL',
  ACTION_DONATE: 'DONATE',
  ACTION_DONATE_FAIL: 'DONATE_FAIL',
  ACTION_DONATE_SUCCESS: 'DONATE_SUCCESS',
};

const {
  ACTION_DONATE,
  ACTION_DONATE_FAIL,
  ACTION_UPDATE_ALLOWANCE,
  ACTION_APPROVE_ALLOWANCE,
  ACTION_APPROVE_ALLOWANCE_FAIL,
  ACTION_APPROVE_ALLOWANCE_SUCCESS,
  ACTION_INIT,
  ACTION_UPDATE_AMOUNT,
  ACTION_DONATE_SUCCESS,
  ACTION_ALLOWANCE_FAIL,
} = ACTIONS;

const pureWeb3 = new Web3();
const toWei = value => pureWeb3.utils.toWei(value.toString());
const toBN = value => new pureWeb3.utils.BN(value);

const initialViewState = VIEW_LOADING;
const reducerWrapper = (_state, _action) => {
  // To test views uncomment below line and change and change initialViewState value above
  // return _state

  const reducer = (state, action) => {
    const { type, web3, amount, allowance } = action;
    switch (type) {
      case ACTION_INIT:
        return {
          ...state,
          viewState: VIEW_LOADING,
          daiTokenContract: web3 && new ERC20Contract(web3, DAITokenAddress),
          givethBridge: web3 && new GivethBridge(web3, givethBridgeAddress),
        };

      case ACTION_UPDATE_AMOUNT: {
        let { viewState } = state;
        const amountWei = toWei(amount);
        const amountBN = toBN(amountWei);

        if (state.viewState !== VIEW_LOADING) {
          viewState = amountBN.gt(toBN(state.allowance))
            ? VIEW_READY_TO_APPROVE
            : VIEW_ENOUGH_ALLOWANCE;
        }
        return {
          ...state,
          amount,
          viewState,
        };
      }

      case ACTION_UPDATE_ALLOWANCE: {
        const amountBN = toBN(toWei(state.amount));
        return {
          ...state,
          allowance,
          viewState: amountBN.gt(toBN(allowance)) ? VIEW_READY_TO_APPROVE : VIEW_ENOUGH_ALLOWANCE,
        };
      }

      case ACTION_DONATE:
        return {
          ...state,
          viewState: VIEW_DONATING,
        };

      case ACTION_DONATE_SUCCESS:
        return {
          ...state,
          viewState: VIEW_DONATING_SUCCESS,
        };

      case ACTION_DONATE_FAIL:
        return {
          ...state,
          viewState: VIEW_DONATING_FAILED,
        };

      case ACTION_APPROVE_ALLOWANCE:
        return {
          ...state,
          viewState: VIEW_APPROVING,
        };

      case ACTION_APPROVE_ALLOWANCE_FAIL:
        return {
          ...state,
          viewState: VIEW_DONATING_FAILED,
        };

      default:
        // throw new Error(`Action is not supported: ${action}`);
        return state;
    }
  };
  const newState = reducer(_state, _action);
  // console.log('state:', newState);
  return newState;
};

const DonateModal = props => {
  const { onClose, amount, onDonate } = props;
  const { web3, address, network } = useContext(OnboardContext);

  const [state, dispatch] = useReducer(reducerWrapper, {
    viewState: initialViewState,
    daiTokenContract: new ERC20Contract(web3, DAITokenAddress),
    givethBridge: new GivethBridge(web3, givethBridgeAddress),
    amount,
    allowance: 0,
  });

  const { daiTokenContract, givethBridge, viewState } = state;
  const updateAllowance = async () => {
    return daiTokenContract
      .allowance(address, givethBridgeAddress)
      .call()
      .then(value => dispatch({ type: ACTION_UPDATE_ALLOWANCE, allowance: value }))
      .catch(e => dispatch({ type: ACTION_ALLOWANCE_FAIL, e }));
  };
  useEffect(() => {
    // console.log('web3 is changed');
    dispatch({ type: ACTION_INIT, web3 });
    updateAllowance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    dispatch({ type: ACTION_UPDATE_AMOUNT, amount });
  }, [amount]);

  useEffect(() => {
    if (network !== config.networkId) onClose();
  }, [network, onClose]);

  if (!web3) return null;

  const approve = async () => {
    dispatch({ type: ACTION_APPROVE_ALLOWANCE });

    // setViewState(APPROVING);
    try {
      await AllowanceHelper.approveERC20tokenTransfer(daiTokenContract, address);
      dispatch({ type: ACTION_APPROVE_ALLOWANCE_SUCCESS });
    } catch (e) {
      dispatch({ type: ACTION_APPROVE_ALLOWANCE_FAIL });
    } finally {
      updateAllowance();
    }
  };

  const donate = async () => {
    dispatch({ type: ACTION_DONATE });
    try {
      await givethBridge.donateAndCreateGiver(
        address,
        config.targetProjectId,
        DAITokenAddress,
        toWei(amount),
      );
      dispatch({ type: ACTION_DONATE_SUCCESS });
      onDonate();
    } catch (e) {
      dispatch({ type: ACTION_DONATE_FAIL });
    }
  };

  const contents = {};

  contents[VIEW_LOADING] = (
    <div className="modal-content">
      <figure className="image is-64x64">
        <img alt="spinner" src={spinner} />
      </figure>
      <h2>Loading</h2>
    </div>
  );

  contents[VIEW_READY_TO_APPROVE] = (
    <>
      <div className="level">
        <div className="level-item">
          <figure className="image is-64x64">
            <img src={DAI} alt="DAI logo" />
          </figure>
        </div>
      </div>
      <p className="is-size-5 has-text-centered has-text-weight-bold">
        We need permission to use your DAI
      </p>
      <br />
      <h2 className="has-text-centered mb-2">
        Please approve DAI spend from your wallet to continue.
      </h2>
    </>
  );

  contents[VIEW_APPROVING] = (
    <>
      <div className="level">
        <div className="level-item">
          <div className="card">
            <div className="card-image">
              <p className="image is-64x64">
                <img src={DAI} alt="DAI logo" />
              </p>
            </div>
            <div className="is-overlay">
              <Player
                autoplay
                loop
                src="https://assets9.lottiefiles.com/packages/lf20_WXXDFD.json"
                style={{ height: '64px', width: '64px' }}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="is-size-5 has-text-centered has-text-weight-bold">Transaction sent</p>
      <br />
      <h2 className="has-text-centered mb-2">Approving your DAI balance.</h2>
    </>
  );

  contents[VIEW_APPROVE_FAILED] = (
    <>
      <div className="level">
        <div className="level-item">
          <div className="card">
            <div className="card-image">
              <p className="image is-64x64">{/* <img src={DAI} alt="DAI logo" /> */}</p>
            </div>
            <div className="is-overlay">
              <Player
                autoplay
                src="https://assets2.lottiefiles.com/packages/lf20_h3Bz5a.json"
                style={{ height: '64px', width: '64px' }}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="is-size-5 has-text-centered has-text-weight-bold">Transaction failed!</p>
      <br />
      <h2 className="has-text-centered mb-2">
        Please try again, or{' '}
        <a
          href="mailto:info@commonsstack.foundation"
          subject="I have a problem getting CSTK tokens"
          className="support-link"
        >
          contact support
        </a>{' '}
        if you experience further difficulties.
      </h2>
    </>
  );

  contents[VIEW_ENOUGH_ALLOWANCE] = (
    <>
      <div className="level">
        <div className="level-item">
          <div className="card">
            <div className="card-image">
              <p className="image is-64x64">{/* <img src={DAI} alt="DAI logo" /> */}</p>
            </div>
            <div className="is-overlay">
              <Player
                autoplay
                src="https://assets2.lottiefiles.com/packages/lf20_tAtUrg.json"
                style={{ height: '64px', width: '64px' }}
              />
            </div>
          </div>
        </div>
      </div>
      <h2 className="has-text-centered pb-2">Ready to send your dues!</h2>
      <p className="has-text-centered subtitle">
        Press the button below to execute the transaction
      </p>
    </>
  );

  contents[VIEW_DONATING] = (
    <>
      <div className="level">
        <div className="level-item">
          <div className="card">
            <div className="card-image">
              <p className="image is-64x64">
                <img src={CSTK} alt="CSTK logo" />
              </p>
            </div>
            <div className="is-overlay">
              <Player
                autoplay
                loop
                src="https://assets9.lottiefiles.com/packages/lf20_WXXDFD.json"
                style={{ height: '64px', width: '64px' }}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="is-size-5 has-text-centered has-text-weight-bold">Transaction sent</p>
      <br />
      <h2 className="has-text-centered mb-2">Waiting for the transaction to be completed</h2>
    </>
  );

  contents[VIEW_DONATING_FAILED] = (
    <>
      <div className="level">
        <div className="level-item">
          <div className="card">
            <div className="card-image">
              <p className="image is-64x64">
                <img src={CSTK} alt="CSTK logo" />
              </p>
            </div>
            <div className="is-overlay">
              <Player
                autoplay
                src="https://assets2.lottiefiles.com/packages/lf20_h3Bz5a.json"
                style={{ height: '64px', width: '64px' }}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="is-size-5 has-text-centered has-text-weight-bold">Transaction failed!</p>
      <br />
      <h2 className="has-text-centered mb-2">
        Please try again, or{' '}
        <a
          href="mailto:info@commonsstack.foundation"
          subject="I have a problem getting CSTK tokens"
          className="support-link"
        >
          contact support
        </a>{' '}
        if you experience further difficulties.
      </h2>
    </>
  );

  contents[VIEW_DONATING_SUCCESS] = (
    <>
      <Success />
    </>
  );

  const enableDonateButton = [VIEW_ENOUGH_ALLOWANCE, VIEW_DONATING_FAILED].includes(viewState);
  const showDonateButton = [VIEW_ENOUGH_ALLOWANCE, VIEW_DONATING_FAILED, VIEW_DONATING].includes(
    viewState,
  );

  const enableApproveButton = viewState === VIEW_READY_TO_APPROVE;
  const showApproveButton = [VIEW_APPROVING, VIEW_READY_TO_APPROVE].includes(viewState);

  return (
    <div className="donate-modal modal is-active">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" />
          <button className="delete" aria-label="close" onClick={onClose} />
        </header>
        <section className="modal-card-body">
          {/* This is to show all states in one screen  - should be replaces  bythe function above modalContent()
          in the final version after Kay has done his work ! */}
          {/* {Object.keys(contents).map(k => {
            return (
              <>
                <hr />
                {contents[k]}
              </>
            );
          })} */}
          {contents[viewState]}
        </section>
        <footer className="modal-card-foot">
          {showApproveButton && (
            <button
              className={`button is-primary ${viewState === VIEW_APPROVING ? 'is-loading' : ''}`}
              disabled={!enableApproveButton}
              onClick={approve}
            >
              Approve
            </button>
          )}
          {showDonateButton && (
            <button
              className={`button is-success ${viewState === VIEW_DONATING ? 'is-loading' : ''}`}
              disabled={!enableDonateButton}
              onClick={donate}
            >
              Donate
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    onDonate: () => dispatch({ type: 'USER_HAS_DONATED' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DonateModal);
