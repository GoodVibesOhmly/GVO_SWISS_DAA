import React, { useCallback, useContext, useEffect } from 'react';
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
import WelcomeModal from './WelcomeModal';

const Comp = ({
  showwelcome,
  agreedtandc,
  agreedstatutes,
  userIsWhiteListed,
  balances,
  hasDonated,
  effectiveBalance,
  getBalancesFor,
  getEffectiveBalancesFor,
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

  const updateBalances = useCallback(() => {
    getBalancesFor(address);
    getEffectiveBalancesFor(address);
    // if (balances && balances[address]) {
    //   const userBalance = balances[address];
    //   const cstk = userBalance.find(b => b.symbol === 'CSTK');
    //   if (cstk) {
    //     setCstkbalance(cstk.balanceFormatted);
    //   }
    // }
  }, [address, getBalancesFor, getEffectiveBalancesFor]);

  useEffect(() => {
    updateBalances();
    const interval = setInterval(updateBalances, 25000);
    return () => {
      clearInterval(interval);
    };
  }, [updateBalances]);

  const [cstkBalance, setCstkbalance] = React.useState('');

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
  }, [balances, effectiveBalance, address]);

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
      {(!web3 || effectiveBalance === 0) && showwelcome ? <WelcomeModal /> : null}

      <article className=" notification is-primary">
        <div className="contribmain">
          <p className="subtitle mb-2">YOUR MEMBERSHIP SCORE</p>
          {web3 && address && (
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
                            {effectiveBalance > 0 ? cstkBalance : '0'} CSTK
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
                          {effectiveBalance > 0 ? 'Pay Additional Dues' : 'Pay Membership Dues'}
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
                        The connected address is not in the Trusted Seed registry
                      </p>
                      <div className="mb-08">
                        If you have already been accepted into the Trusted Seed, please connect with
                        the same Ethereum address that you used to join. If you have not yet applied
                        to be a member of the Trusted Seed, you will need to do that first.
                      </div>
                      <p className="control">
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href="https://commonsstack.org/apply"
                          className="button is-success"
                          style={{ marginTop: '16px' }}
                        >
                          Apply for membership
                        </a>
                      </p>
                    </article>
                  </div>
                </div>
              )}

              <br />
              <p>
                {effectiveBalance > 0 ? (
                  <>
                    <span className="icon has-text-success">
                      <i className="fas fa-check-circle" />
                    </span>
                    Your membership dues are paid. By paying more membership dues you will further
                    help the mission of the organization.
                  </>
                ) : (
                  'Membership dues are paid with DAI.'
                )}{' '}
                You can acquire DAI on{' '}
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
                            title="I've just become a member of Commons Stack's Swiss Association! 🎉🌍🌌🎩🥂 Join us:"
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
                            title="I've just become a member of Commons Stack's Swiss Association! 🎉🌍🌌🎩🥂 Join us!"
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
          {(!web3 || !address) && (
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
                <div className="level-item is-shrinkable">
                  <div className="title-level">
                    <div className="item-container">
                      <img
                        className="item-image"
                        src={GovernanceRights}
                        alt="Participation in Community Governance"
                      />

                      <p className="subtitle">
                        <span>Participation in Community Governance</span>
                        {/* <span className="icon info-icon-small is-small has-text-info">
                        <span className="has-tooltip-arrow" data-tooltip="Tooltip content"><i className="fas fa-info-circle" /></span>
                        </span> */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="level-item is-shrinkable">
                  <div className="title-level">
                    <div className="item-container">
                      <img
                        className="item-image"
                        src={Access}
                        alt="Potential Access to Many Future Hatches"
                      />
                      <p className="subtitle">
                        <span>Potential Access to Many Future Hatches</span>
                        {/* <span className="icon info-icon-small is-small has-text-info">
                          <i className="fas fa-info-circle" />
                        </span> */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="level-item is-shrinkable">
                  <div className="title-level">
                    <div className="item-container">
                      <img
                        className="item-image"
                        src={Membership}
                        alt="Membership in Commons Stack Swiss Association"
                      />
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
    showwelcome: state.showwelcome,
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
    effectiveBalance: state.effectiveBalance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBalancesFor: address => dispatch({ type: 'GET_BALANCES_FOR_ADDRESS', address }),
    getEffectiveBalancesFor: address =>
      dispatch({ type: 'GET_EFFECTIVEBALANCE_FOR_ADDRESS', address }),
    onSetAgreedtandc: signature => dispatch({ type: 'AGREE_TANDC', signature }),
    setShowTandC: value => dispatch({ type: 'SET_SHOW_TANDC', value }),
    onCloseContributeThanks: () => dispatch({ type: 'CLOSE_CONTRIBUTE_THANKS' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
