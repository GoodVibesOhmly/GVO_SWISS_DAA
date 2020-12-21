import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Contribute.sass';
import { TwitterShareButton, TelegramShareButton, TwitterIcon, TelegramIcon } from 'react-share';
import WalletButton from '../../../components/WalletButton';
import GovernanceRights from '../../../assets/governanceRights.svg';
import Access from '../../../assets/access.svg';
import Membership from '../../../assets/membership.svg';
import Slider from '../../../components/Slider';
import Cstk from '../../../assets/cstk.svg';
import ContributeForm from './ContributeForm';
import { OnboardContext } from '../../../components/OnboardProvider';

const Comp = ({ agreedtandc, agreedstatutes, balances }) => {
  const viewStates = Object.freeze({
    INIT: 1,
    WAITINGTOCONTRIBUTE: 2,
    STARTDONATING: 3,
    FINISHEDDONATING: 4,
  });

  const { web3, onboard, isReady, address } = useContext(OnboardContext);
  const [viewState, setViewState] = React.useState(viewStates.INIT);

  const changeViewState = (from, to) => {
    // make sure you can only transition from a known state to another known state
    if (viewState === from) {
      setViewState(to);
    } else {
      console.log(`Cannot transition to this VS`);
    }
  };

  const [cstkBalance, setCstkbalance] = useState('');

  useEffect(() => {
    let balance = '0';
    if (balances && balances[address]) {
      const userBalance = balances[address];
      const cstk = userBalance.find(b => b.symbol === 'CSTK');
      if (cstk) {
        balance = cstk.balanceFormatted;
      }
    }
    setCstkbalance(balance);
  }, [balances, address]);

  useEffect(() => {
    const _changeViewState = (from, to) => {
      // make sure you can only transition from a known state to another known state
      if (viewState === from) {
        setViewState(to);
      } else {
        console.log(`Cannot transition to this VS`);
      }
    };
    // if (web3 && agreedtandc && agreedstatutes && personalCap ) {
    if (web3 && agreedtandc && agreedstatutes) {
      // TODO : remove this
      _changeViewState(viewStates.INIT, viewStates.WAITINGTOCONTRIBUTE);
    }
  }, [
    web3,
    agreedtandc,
    agreedstatutes,
    viewState,
    viewStates.INIT,
    viewStates.WAITINGTOCONTRIBUTE,
  ]);

  useEffect(() => {
    if (!isReady && viewState === viewStates.STARTDONATING) {
      setViewState(viewStates.WAITINGTOCONTRIBUTE);
    }
  }, [isReady, viewState, viewStates.STARTDONATING, viewStates.WAITINGTOCONTRIBUTE]);

  return (
    <div className="tile is-child">
      <article className=" notification is-primary">
        <div className="contribmain">
          <p className="subtitle mb-2">YOUR MEMBERSHIP SCORE</p>

          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img alt="CSTK logo" src={Cstk} />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p className="heading is-size-2 has-text-weight-bold">{cstkBalance} CSTK</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <span>
                  {viewState === viewStates.WAITINGTOCONTRIBUTE && (
                    <button
                      onClick={() => {
                        onboard.walletCheck().then(readyToTransact => {
                          if (readyToTransact) {
                            changeViewState(
                              viewStates.WAITINGTOCONTRIBUTE,
                              viewStates.STARTDONATING,
                            );
                          }
                        });
                      }}
                      className="button is-success is-medium"
                    >
                      Make Contribution
                    </button>
                  )}
                </span>
              </div>
            </div>
          </div>

          <br />
          <p>
            You can pay membership dues with DAI only. You can acquire DAI on{' '}
            <a rel="noopener noreferrer" target="_blank" href="https://1inch.exchange">
              1inch.exchange
            </a>
          </p>

          {viewState === viewStates.STARTDONATING && (
            <>
              <ContributeForm
                onClose={() => {
                  changeViewState(viewStates.STARTDONATING, viewStates.FINISHEDDONATING);
                }}
              />
            </>
          )}
          {/* {viewState === viewStates.FINISHEDDONATING && (<> */}
          <div className="enable has-text-left">
            <div className="contribmain">
              <p className="subtitle is-size-2">Thank you for the contribution!</p>
              <div className="level">
                <div className="level-item">5000 CSTK</div>
                <div className="level-right">
                  <div className="level-item">
                    <div>
                      <button
                        className="button is-text text-color-white"
                        href="#"
                        onClick={() => {
                          changeViewState(
                            viewStates.FINISHEDDONATING,
                            viewStates.WAITINGTOCONTRIBUTE,
                          );
                        }}
                      >
                        CLOSE
                      </button>
                      <br />
                      <br />
                      <br />
                      <TwitterShareButton url="https://commonsstack.org" title="I funded the CS!">
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <TelegramShareButton url="https://commonsstack.org" title="I funded the CS!">
                        <TelegramIcon size={32} round />
                      </TelegramShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </>)} */}

          {!web3 && (
            <div className="enable has-text-centered">
              <p className="title">
                Want to contribute to Commons Stack? Connect your wallet below.
              </p>
              <WalletButton className="is-outlined" clickMessage="Connect Wallet" />
            </div>
          )}
          <div className="is-divider mt-2 mb-2" />
          <Slider />
          <div className="is-divider mt-2 mb-2" />
          <div className="title-level">
            <div className="level-left">
              <p className="subtitle mb-2">FOR YOUR CONTRIBUTION YOU WILL ALSO RECEIVE:</p>
            </div>

            <div className="level">
              <div className="items-container">
                <div className="level-item">
                  <div className="title-level">
                    <div className="item-container">
                      <img src={GovernanceRights} alt="Governance Rights" />

                      <p className="subtitle">
                        <span>Governance Rights</span>
                        {/* <span className="icon info-icon-small is-small has-text-info">
                        <span class="has-tooltip-arrow" data-tooltip="Tooltip content"><i className="fas fa-info-circle" /></span>
                        </span> */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="level-item">
                  <div className="title-level">
                    <div className="item-container">
                      <img src={Access} alt="Access to Future ABC Hatch Phases" />
                      <p className="subtitle">
                        <span>Access to Future ABC Hatch Phases</span>
                        {/* <span className="icon info-icon-small is-small has-text-info">
                          <i className="fas fa-info-circle" />
                        </span> */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="level-item">
                  <div className="title-level">
                    <div className="item-container">
                      <img src={Membership} alt="Membership in Swiss Commons Stack Associations" />
                      <p className="subtitle">
                        <span>Membership in Swiss Commons Stack Associations</span>
                        {/* <span className="icon info-icon-small is-small has-text-info">
                          <i className="fas fa-info-circle" />
                        </span> */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    agreedtandc: state.agreedtandc,
    agreedstatutes: state.agreedstatutes,
    personalCap: state.personalCap,
    numerator: state.numerator,
    denominator: state.denominator,
    softCap: state.softCap,
    hardCap: state.hardCap,
    totalReceived: state.totalReceived,
    balances: state.balances,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAgreedtandc: signature => dispatch({ type: 'AGREE_TANDC', signature }),
    setShowTandC: value => dispatch({ type: 'SET_SHOW_TANDC', value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
