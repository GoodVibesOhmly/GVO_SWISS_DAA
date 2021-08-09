import React, { useContext } from 'react';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';
import './Contribute.sass';
import DAI from '../../../assets/dai.svg';
import arrow from '../../../assets/arrow.svg';
import CSTK from '../../../assets/cstk.svg';
import DonateModal from './DonateModal';
import { OnboardContext } from '../../../components/OnboardProvider';
import Tooltip from './Tooltip';
import './DonateModal.sass';
import config from '../../../config';

const minContribution = config.minimumContribution.nonMember;

const Comp = ({
  onClose,
  balances,
  getBalancesFor,
  setContributeFormAmountDai,
  contributeFormAmountDai,
}) => {
  const { isReady, address } = useContext(OnboardContext);
  const [amountDAI, setAmountDAI] = React.useState(config.defaultContribution);
  const [amountCSTK, setAmountCSTK] = React.useState(0);
  const [balanceDAI, setBalanceDAI] = React.useState(0);
  const [hasPaidDues, setHasPaidDues] = React.useState(false);
  const [amountScholarship, setAmountScholarship] = React.useState(0);
  const [showDonateModal, setShowDonateModal] = React.useState(false);
  // const [showThankYouModal, setShowThankYouModal] = React.useState(false);
  const [donationButtonEnabled, setDonationButtonEnabled] = React.useState(false);
  const [showMaxTrustScoreTooltip, setShowMaxTrustScoreTooltip] = React.useState(false);
  const [showScholarshipTooltip, setShowScholarshipTooltip] = React.useState(false);
  const [showApplyToScholarshipTooltip, setShowApplyToScholarshipTooltip] = React.useState(false);
  const [DAIError, setDAIError] = React.useState();

  const TooltipMaxTrustScoreContent = () => (
    <p>
      If you send that much DAI, you will have reached your Max Trust Score. To increase your Max
      Trust Score, and be able to get a higher CSTK Score, please reach out to the&nbsp;
      <a
        href="https://discord.tecommons.org/"
        target="_blank"
        rel="noreferrer"
        className="support-link"
        style={{ color: '#1BDD9D', textDecoration: 'none' }}
      >
        Commons Stack team on Discord
      </a>
      .
    </p>
  );

  const TooltipScholarshipContent = () => (
    <p>
      {hasPaidDues ? 'This' : 'In addition to your membership dues, this'} will fund{' '}
      {amountScholarship} {amountScholarship === 1 ? 'scholarship' : 'scholarships'}!
    </p>
  );

  const TooltipApplyToScholarship = () => (
    <p>
      You need {minContribution} Dai to pay memberships dues and join the Trusted Seed, if{' '}
      {minContribution} Dai is a financial burden, please consider&nbsp;
      <a
        href="https://medium.com/commonsstack/trusted-seed-swiss-membership-scholarship-application-f2d07bc2fc90"
        target="_blank"
        rel="noreferrer"
        className="support-link"
        style={{ color: '#1BDD9D', textDecoration: 'none' }}
      >
        applying for a scholarship
      </a>
      .
    </p>
  );

  const TooltipDAIError = () => <p>{DAIError}</p>;

  React.useEffect(() => {
    let scholarship;
    if (!hasPaidDues) {
      scholarship = Math.floor(amountDAI / minContribution - 1);
    } else {
      scholarship = Math.floor(amountDAI / minContribution);
    }
    if (scholarship >= 1) {
      setAmountScholarship(scholarship);
      setShowScholarshipTooltip(true);
    } else {
      setShowScholarshipTooltip(false);
    }
  }, [showScholarshipTooltip, amountScholarship, amountDAI, hasPaidDues]);

  React.useEffect(() => {
    try {
      const amountDAIFloat = parseFloat(amountDAI);
      if (Number.isNaN(amountDAIFloat)) {
        if (amountDAI && amountDAI !== '') {
          setDAIError('please enter a number');
        }
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
          cstkToReceive = cstkToReceive > 0 ? cstkToReceive : 0;
          setShowMaxTrustScoreTooltip(true);
        } else {
          setShowMaxTrustScoreTooltip(false);
        }
        if (cstkBalance > 0) setHasPaidDues(true);
        setAmountCSTK(cstkToReceive);
        setDAIError(null);

        if (!hasPaidDues && amountDAIFloat < config.minimumContribution.member) {
          setDAIError(`Minimum is ${config.minimumContribution.member} DAI`);
        } else if (cstkBalance === 0 && amountDAIFloat < minContribution) {
          setDAIError(`Minimum is ${minContribution} DAI`);
        }
      }
    } catch (e) {
      // console.error(e);
    }
  }, [amountDAI, balances, address, getBalancesFor, hasPaidDues]);

  React.useEffect(() => {
    if (typeof contributeFormAmountDai !== 'undefined') return; // Proceed only if no DAI value has been entered by user
    try {
      if (balances && balances[address]) {
        const dai = balances[address].find(b => b.symbol === 'DAI');
        setBalanceDAI(dai.balance);
        setShowApplyToScholarshipTooltip(dai.balance.lt(minContribution) && !hasPaidDues);
        if (dai.balance.gt(minContribution)) {
          if (dai.balance.gt(900)) {
            setAmountDAI(900);
            return;
          }
          setAmountDAI(dai.balance.integerValue());
          return;
        }
        setAmountDAI(minContribution);
      }
    } catch (e) {
      // console.error(e);
    }
  }, [balances, address, contributeFormAmountDai, hasPaidDues]);

  React.useEffect(() => {
    setContributeFormAmountDai(amountDAI);
  }, [amountDAI, setContributeFormAmountDai]);

  React.useEffect(() => {
    setDonationButtonEnabled(
      (hasPaidDues && amountDAI > 0) || amountDAI >= minContribution || amountCSTK !== 0,
    );
  }, [amountCSTK, amountDAI, hasPaidDues]);

  return (
    <>
      {showDonateModal && isReady && (
        <DonateModal
          onClose={() => {
            setShowDonateModal(false);
            onClose();
            // setShowThankYouModal(true)
          }}
          amountDAI={amountDAI}
          amountCSTK={amountCSTK}
        />
      )}
      <div className="enable has-text-left">
        <div className="contribmain">
          <div className="level">
            <div className="level-left" style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div className="level-item">
                <div className="field">
                  <div className="control has-icons-left">
                    <span className="select">
                      <select disabled>
                        <option>DAI</option>
                      </select>
                    </span>
                    <span className="icon is-small is-left">
                      <figure className="image is-16x16">
                        <img src={DAI} alt="DAI" />
                      </figure>
                    </span>
                  </div>
                </div>
              </div>
              <div className="level-item">
                <div className="field" style={{ maxWidth: `100px` }}>
                  <Tooltip
                    className="control"
                    active={showScholarshipTooltip || showApplyToScholarshipTooltip || !!DAIError}
                    content={
                      // eslint-disable-next-line no-nested-ternary
                      showScholarshipTooltip ? (
                        <TooltipScholarshipContent />
                      ) : showApplyToScholarshipTooltip ? (
                        <TooltipApplyToScholarship />
                      ) : (
                        <TooltipDAIError />
                      )
                    }
                  >
                    <input
                      className="input amount"
                      type="number"
                      placeholder=""
                      min="0"
                      onChange={e => {
                        setAmountDAI(e.target.value);
                      }}
                      style={{
                        border:
                          (showApplyToScholarshipTooltip && balanceDAI < minContribution) ||
                          !!DAIError
                            ? '1px solid red'
                            : '',
                      }}
                      value={amountDAI}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="level-item">
              <div className="field">
                <div className="control is-flex">
                  <img alt="arrow right" src={arrow} />
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
                      forceShowOnActive
                      content={<TooltipMaxTrustScoreContent />}
                    >
                      <input
                        className="input amount"
                        disabled
                        type="text"
                        style={{ border: showMaxTrustScoreTooltip ? '1px solid red' : '' }}
                        value={amountCSTK}
                        placeholder=""
                      />
                    </Tooltip>
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
            {hasPaidDues ? 'Pay Additional Dues' : 'Pay Membership Dues'}
          </button>
        </div>
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
    contributeFormAmountDai: state.contributeFormAmountDai,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBalancesFor: address => dispatch({ type: 'GET_BALANCES_FOR_ADDRESS', address }),
    onSetAgreedtandc: signature => dispatch({ type: 'AGREE_TANDC', signature }),
    setShowTandC: value => dispatch({ type: 'SET_SHOW_TANDC', value }),
    setContributeFormAmountDai: value => dispatch({ type: 'SET_CONTRIBUTEFORM_AMOUNT_DAI', value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
