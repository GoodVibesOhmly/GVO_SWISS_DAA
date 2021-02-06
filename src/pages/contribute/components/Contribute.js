import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Contribute.sass';
import { TwitterShareButton, TelegramShareButton, TwitterIcon, TelegramIcon } from 'react-share';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import WalletButton from '../../../components/WalletButton';
import GovernanceRights from '../../../assets/governanceRights.svg';
import Access from '../../../assets/access.svg';
import GreyLogo from '../../../assets/greylogo.svg';
import Membership from '../../../assets/membership.svg';
import Cstk from '../../../assets/cstk.svg';
import ContributeForm from './ContributeForm';
import { OnboardContext } from '../../../components/OnboardProvider';
import donationConfirmed from '../../../assets/donation-confirmed.svg';

const Comp = ({
  agreedtandc,
  agreedstatutes,
  userIsWhiteListed,
  balances,
  hasDonated,
  getBalancesFor,
  onCloseContributeThanks,
}) => {
  const viewStates = Object.freeze({
    INIT: 'INIT',
    WAITINGTOCONTRIBUTE: 'WAITINGTOCONTRIBUTE',
    STARTDONATING: 'STARTDONATING',
    FINISHEDDONATING: 'FINISHEDDONATING',
  });

  const { web3, onboard, isReady, address } = useContext(OnboardContext);
  const [viewState, setViewState] = React.useState(viewStates.INIT);
  const { width, height } = useWindowSize();

  const changeViewState = (from, to) => {
    if (viewState === to) return;
    // make sure you can only transition from a known state to another known state
    if (!from || viewState === from) {
      setViewState(to);
    } else {
      // console.log(`Cannot transition from ${from} to ${to} since I am in ${viewState}`);
    }
  };

  const updateBalances = () => {
    getBalancesFor(address);
    if (balances && balances[address]) {
      const userBalance = balances[address];
      const cstk = userBalance.find(b => b.symbol === 'CSTK');
      if (cstk) {
        setCstkbalance(cstk.balanceFormatted);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(updateBalances, 5000);
    return () => {
      clearInterval(interval);
    };
  });

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
    if (web3 && agreedtandc && agreedstatutes && userIsWhiteListed) {
      changeViewState(viewStates.INIT, viewStates.WAITINGTOCONTRIBUTE);
    } else {
      changeViewState(viewStates.WAITINGTOCONTRIBUTE, viewStates.INIT);
      changeViewState(viewStates.STARTDONATING, viewStates.INIT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    web3,
    agreedtandc,
    agreedstatutes,
    userIsWhiteListed,
    viewState,
    viewStates.INIT,
    viewStates.WAITINGTOCONTRIBUTE,
  ]);

  useEffect(() => {
    if (!isReady && viewState === viewStates.STARTDONATING) {
      setViewState(viewStates.WAITINGTOCONTRIBUTE);
    }
  }, [isReady, viewState, viewStates.STARTDONATING, viewStates.WAITINGTOCONTRIBUTE]);

  useEffect(() => {
    const _changeViewState = (from, to) => {
      if (viewState === to) return;
      // make sure you can only transition from a known state to another known state
      if (viewState === from) {
        setViewState(to);
      } else {
        // console.log(`Cannot transition from ${from} to ${to} since I am in ${viewState}`);
      }
    };
    if (hasDonated) {
      _changeViewState(viewStates.STARTDONATING, viewStates.FINISHEDDONATING);
    } else {
      _changeViewState(viewStates.FINISHEDDONATING, viewStates.WAITINGTOCONTRIBUTE);
    }
  }, [
    viewState,
    hasDonated,
    viewStates.FINISHEDDONATING,
    viewStates.WAITINGTOCONTRIBUTE,
    viewStates.STARTDONATING,
  ]);

  return (
    <div className="tile is-child">
      <article className=" notification is-primary">
        <div className="contribmain">
          <p className="subtitle mb-2">YOUR MEMBERSHIP SCORE</p>
          {web3 && (
            <>
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
                          <p className="heading is-size-2 has-text-weight-bold">
                            {cstkBalance} CSTK
                          </p>
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
                          Pay Membership Dues
                        </button>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {viewState === viewStates.INIT && (
                <div>
                  <div className="tile is-child">
                    <article className=" notification is-primary has-text-centered">
                      <div>
                        <img alt="CS Egg" src={GreyLogo} />
                      </div>
                      <p className="is-size-3 mb-08 warning">
                        You're not yet a member of the Trusted Seed
                      </p>
                      <div className="mb-08">
                        Sorry, but your address is not whitelisted. In order to be able to receive
                        CSTK tokens you need to apply to become a member of the Trusted Application
                        may take up to a week. Or you may need to switch to your other wallet.
                      </div>
                      <p className="control">
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href="https://commonsstack.org/apply"
                          className="button is-success"
                          style={{ marginTop: '16px' }}
                        >
                          Apply for the whitelist
                        </a>
                      </p>
                    </article>
                  </div>
                </div>
              )}

              <br />
              <p>
                You can pay membership dues with DAI only. You can acquire DAI e.g. on{' '}
                <a
                  className="exchange"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://1inch.exchange/#/r/0x8110d1D04ac316fdCACe8f24fD60C86b810AB15A"
                >
                  1inch.exchange
                </a>
              </p>

              {viewState === viewStates.STARTDONATING && (
                <>
                  <ContributeForm
                    onClose={() => {
                      if (hasDonated) {
                        changeViewState(viewStates.STARTDONATING, viewStates.FINISHEDDONATING);
                      }
                    }}
                  />
                </>
              )}
              {viewState === viewStates.FINISHEDDONATING && (
                <div className="donate-modal-thanks modal is-active">
                  <Confetti
                    numberOfPieces={300}
                    width={width}
                    height={height}
                    colors={['#AECAAC', '#FFFFFF', '#884444']}
                    recycle={false}
                    wind={0}
                    gravity={0.03}
                    initialVelocityY={-10}
                  />
                  <div
                    className="modal-background"
                    onClick={() => {
                      onCloseContributeThanks();
                      changeViewState(null, viewStates.WAITINGTOCONTRIBUTE);
                    }}
                  />
                  <div className="modal-card has-text-centered">
                    <header className="modal-card-head">
                      <p className="modal-card-title" />
                      <button
                        className="delete"
                        aria-label="close"
                        onClick={() => {
                          onCloseContributeThanks();
                          changeViewState(null, viewStates.WAITINGTOCONTRIBUTE);
                        }}
                      />
                    </header>
                    <section className="modal-card-body ">
                      <div className="level">
                        <div className="level-item">
                          <img
                            src={donationConfirmed}
                            className="image is-128x128"
                            alt="Donation confirmed"
                          />
                        </div>
                      </div>
                      <p className="has-text-centered is-size-2">Thank you for the contribution!</p>
                      <br />
                      <br />
                      <p className="has-text-centered is-size-5">
                        Your CSTK score will be updated soon!
                      </p>
                    </section>
                    <footer className="modal-card-foot">
                      <div className="field is-grouped">
                        <p className="control">
                          <TwitterShareButton
                            className="button is-primary"
                            resetButtonStyle={false}
                            url="https://commonsstack.org"
                            title="I funded the CS!"
                          >
                            <span className="icon">
                              <TwitterIcon bgStyle={{ fill: 'none' }} size={32} round />
                            </span>
                            <span>Share on Twitter</span>
                          </TwitterShareButton>
                        </p>
                        <p className="control">
                          <TelegramShareButton
                            className="button is-primary"
                            resetButtonStyle={false}
                            url="https://commonsstack.org"
                            title="I funded the CS!"
                          >
                            <span className="icon">
                              <TelegramIcon bgStyle={{ fill: 'none' }} size={32} round />
                            </span>
                            <span>Share on Telegram</span>
                          </TelegramShareButton>
                        </p>
                      </div>
                    </footer>
                  </div>
                </div>
              )}
            </>
          )}
          {!web3 && (
            <div className="enable has-text-centered">
              <p className="title">
                Want to contribute to Commons Stack? Connect your wallet below.
              </p>
              <WalletButton className="is-outlined" clickMessage="Connect Wallet" />
            </div>
          )}
          <div className="is-divider mt-2 mb-2" />
          <div className="title-level">
            <div className="level-left">
              <p className="subtitle mb-2">Your CSTK Score enables:</p>
            </div>
            <div className="level">
              <div className="items-container">
                <div className="level-item">
                  <div className="title-level">
                    <div className="item-container">
                      <img src={GovernanceRights} alt="Participation in Community Governance" />

                      <p className="subtitle">
                        <span>Participation in Community Governance</span>
                        {/* <span className="icon info-icon-small is-small has-text-info">
                        <span className="has-tooltip-arrow" data-tooltip="Tooltip content"><i className="fas fa-info-circle" /></span>
                        </span> */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="level-item">
                  <div className="title-level">
                    <div className="item-container">
                      <img src={Access} alt="Potential Access to Many Future Hatches" />
                      <p className="subtitle">
                        <span>Potential Access to Many Future Hatches</span>
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
                      <img src={Membership} alt="Membership in Commons Stack Swiss Association" />
                      <p className="subtitle">
                        <span>Membership in Commons Stack Swiss Association</span>
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
    userIsWhiteListed: state.userIsWhiteListed,
    numerator: state.numerator,
    denominator: state.denominator,
    softCap: state.softCap,
    hardCap: state.hardCap,
    totalReceived: state.totalReceived,
    balances: state.balances,
    hasDonated: state.hasDonated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBalancesFor: address => dispatch({ type: 'GET_BALANCES_FOR_ADDRESS', address }),
    onSetAgreedtandc: signature => dispatch({ type: 'AGREE_TANDC', signature }),
    setShowTandC: value => dispatch({ type: 'SET_SHOW_TANDC', value }),
    onCloseContributeThanks: () => dispatch({ type: 'CLOSE_CONTRIBUTE_THANKS' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
