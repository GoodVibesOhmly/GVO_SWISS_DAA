import React, { useContext } from 'react';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';
import './Contribute.sass';
import DAI from 'cryptocurrency-icons/svg/color/dai.svg';
import arrow from '../../../assets/arrow.svg';
import CSTK from '../../../assets/cstk.svg';
import DonateModal from './DonateModal';
import { OnboardContext } from '../../../components/OnboardProvider';
import Tooltip from './Tooltip';
import './DonateModal.sass';

const config = require('../../../config');

const Comp = ({ onClose, balances, getBalancesFor }) => {
  const { isReady, address } = useContext(OnboardContext);
  const [amountDAI, setAmountDAI] = React.useState(config.defaultContribution);
  const [amountCSTK, setAmountCSTK] = React.useState(0);
  const [amountScholarship, setAmountScholarship] = React.useState(0);
  const [showDonateModal, setShowDonateModal] = React.useState(false);
  // const [showThankYouModal, setShowThankYouModal] = React.useState(false);
  const [donationButtonEnabled, setDonationButtonEnabled] = React.useState(false);
  const [showMaxTrustScoreTooltip, setShowMaxTrustScoreTooltip] = React.useState(false);
  const [showScholarshipTooltip, setShowScholarshipTooltip] = React.useState(false);
  const [DAIError, setDAIError] = React.useState();

  const TooltipMaxTrustScoreContent = () => (
    <>
      <p>
        If you contribute this amount you will have reached your max. trust score, the max amount of
        CSTK tokens you will receive. If you want to increase the max. score please&nbsp;
        <a
          href="mailto:info@commonsstack.foundation"
          subject="I have a problem getting CSTK tokens"
          className="support-link"
          style={{ color: '#1BDD9D', textDecoration: 'none' }}
        >
          contact us
        </a>
        .
      </p>
      <br />
      <p>
        You can decrease contribution to match you max. trust score or continue and remaning funs
        will be donated to the Commons Stack.
      </p>
    </>
  );

  React.useEffect(() => {
    const scholarship = Math.round(amountDAI / 450 - 1);
    if (scholarship > 1) {
      setAmountScholarship(scholarship);
      setShowScholarshipTooltip(true);
    } else {
      setShowScholarshipTooltip(false);
    }
  }, [showScholarshipTooltip, amountScholarship, amountDAI]);

  const TooltipScholarshipContent = () => (
    <p>In addition to your membership dues, this will fund {amountScholarship} scholarships!</p>
  );

  React.useEffect(() => {
    try {
      // debugger;
      const amountDAIFloat = parseFloat(amountDAI);
      // getBalancesFor(address);
      // console.log(balances);
      if (Number.isNaN(amountDAIFloat)) {
        if (amountDAI && amountDAI !== '') {
          setDAIError('please enter a number');
        }
        setAmountDAI(amountDAIFloat);
        setAmountCSTK(0);
      } else if (balances && balances[address]) {
        const cstk = balances[address].find(b => b.symbol === 'CSTK');
        const myBalance = new BigNumber(cstk.balance || '0');
        const maxTrust = new BigNumber(cstk.maxtrust);
        const totalSupply = new BigNumber(cstk.totalsupply);
        const maxToReceive = maxTrust
          .multipliedBy(totalSupply)
          .dividedBy(new BigNumber('10000000'))
          .minus(myBalance)
          .toNumber();
        let cstkToReceive = Math.floor(config.ratio * amountDAIFloat);
        const cstkBalance = cstk.balance.toNumber();
        if (maxToReceive <= cstkBalance + cstkToReceive) {
          cstkToReceive = Math.floor(maxToReceive - cstkBalance);
          setShowMaxTrustScoreTooltip(true);
        } else {
          setShowMaxTrustScoreTooltip(false);
        }
        setAmountCSTK(cstkToReceive);
        setDAIError(null);
      }

      if (amountDAIFloat < config.minimumContribution) {
        setDAIError(`Minimum contribution is ${config.minimumContribution}`);
      }
    } catch (e) {
      // console.error(e);
    }
  }, [amountDAI, balances, address, getBalancesFor]);

  React.useEffect(() => {
    setDonationButtonEnabled(amountCSTK !== 0);
  }, [amountCSTK]);

  return (
    <>
      {showDonateModal && isReady && (
        <DonateModal
          onClose={() => {
            setShowDonateModal(false);
            onClose();
            // setShowThankYouModal(true)
          }}
          amount={amountDAI}
        />
      )}
      <div className="enable has-text-left">
        <div className="contribmain">
          <p className="subtitle mb-2">I WANT TO CONTRIBUTE</p>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div className="field">
                  <div className="control has-icons-left">
                    <span className="select">
                      <select>
                        <option>DAI</option>
                      </select>
                    </span>
                    <span className="icon is-small is-left">
                      <figure className="image is-16x16">
                        <img src={DAI} alt="DAI" />
                      </figure>
                    </span>
                  </div>
                  <p className="help is-danger">&nbsp;</p>
                </div>
              </div>
              <div className="level-item">
                <div className="field" style={{ maxWidth: `100px` }}>
                  <Tooltip
                    className="control"
                    active={showScholarshipTooltip}
                    content={<TooltipScholarshipContent />}
                  >
                    <input
                      className="input"
                      type="number"
                      placeholder=""
                      onChange={e => {
                        setAmountDAI(e.target.value);
                      }}
                      value={amountDAI}
                    />
                  </Tooltip>
                  <p className="help is-danger">{DAIError || <>&nbsp;</>}</p>
                </div>
              </div>
            </div>
            <div className="level-item">
              <div className="field">
                <div className="control">
                  &nbsp;
                  <img alt="arrow right" src={arrow} />
                  &nbsp;
                  {/* <p class="help is-danger">&nbsp;</p> */}
                </div>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div className="level-item">
                  <div className="field" style={{ maxWidth: '100px' }}>
                    <Tooltip
                      className="control"
                      active={showMaxTrustScoreTooltip}
                      content={<TooltipMaxTrustScoreContent />}
                    >
                      <input
                        className="input"
                        disabled
                        type="text"
                        style={{ border: showMaxTrustScoreTooltip ? '1px solid red' : '' }}
                        value={amountCSTK}
                        placeholder=""
                      />
                    </Tooltip>
                    <p className="help is-danger">&nbsp;</p>
                  </div>
                </div>
                <div className="level-item">
                  <div className="field">
                    <div className="control has-icons-left">
                      <span className="select">
                        <select disabled>
                          <option>CSTK</option>
                        </select>
                      </span>
                      <span className="icon is-small is-left">
                        <figure className="image is-16x16">
                          <img src={CSTK} alt="CSTK" />
                        </figure>
                      </span>
                    </div>
                    <p className="help is-danger">&nbsp;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="button is-success is-fullwidth is-medium"
            disabled={!donationButtonEnabled}
            onClick={() => setShowDonateModal(true)}
          >
            Make Contribution
          </button>
        </div>
        {/* </article> */}
        {/* </div > */}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    agreedtandc: state.agreedtandc,
    personalCap: state.personalCap,
    numerator: state.numerator,
    denominator: state.denominator,
    softCap: state.softCap,
    hardCap: state.hardCap,
    balances: state.balances,
    totalReceived: state.totalReceived,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBalancesFor: address => dispatch({ type: 'GET_BALANCES_FOR_ADDRESS', address }),
    onSetAgreedtandc: signature => dispatch({ type: 'AGREE_TANDC', signature }),
    setShowTandC: value => dispatch({ type: 'SET_SHOW_TANDC', value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
