import React, { useContext } from 'react';
import { connect } from 'react-redux';
import './Contribute.sass';
import DAI from 'cryptocurrency-icons/svg/color/dai.svg';
import arrow from '../../../assets/arrow.svg';
import CSTK from '../../../assets/cstk.svg';
import DonateModal from './DonateModal';
import { OnboardContext } from '../../../components/OnboardProvider';

const config = require('../../../config');

const Comp = ({ onClose, balances, getBalancesFor }) => {
  const { isReady, address } = useContext(OnboardContext);
  const [amountDAI, setAmountDAI] = React.useState(config.defaultContribution);
  const [amountCSTK, setAmountCSTK] = React.useState(0);
  const [showDonateModal, setShowDonateModal] = React.useState(false);
  // const [showThankYouModal, setShowThankYouModal] = React.useState(false);
  const [donationButtonEnabled, setDonationButtonEnabled] = React.useState(false);

  const [DAIError, setDAIError] = React.useState();

  React.useEffect(() => {
    try {
      const amountDAIFloat = parseFloat(amountDAI);
      getBalancesFor(address);
      // console.log(balances);
      if (Number.isNaN(amountDAIFloat)) {
        if (amountDAI && amountDAI !== '') {
          setDAIError('please enter a number');
        }
        setAmountDAI(amountDAIFloat);
        setAmountCSTK(0);
      } else if (balances && balances[address]) {
        const cstk = balances[address].find(b => b.symbol === 'CSTK');
        const maxToReceive = (cstk.maxtrust * cstk.totalsupply) / 10000000;
        let cstkToReceive = Math.floor(config.ratio * amountDAIFloat);
        if (maxToReceive <= cstk.amount + cstkToReceive) {
          cstkToReceive = maxToReceive - cstk.amount;
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
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      placeholder=""
                      onChange={e => {
                        setAmountDAI(e.target.value);
                      }}
                      value={amountDAI}
                    />
                  </div>
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
                  <div className="field" style={{ maxWidth: `100px` }}>
                    <div className="control">
                      <input
                        className="input"
                        disabled
                        type="text"
                        value={amountCSTK}
                        placeholder=""
                      />
                    </div>
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
