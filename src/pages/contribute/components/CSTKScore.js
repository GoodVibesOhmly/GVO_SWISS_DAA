import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { OnboardContext } from '../../../components/OnboardProvider';
import CSTK from '../../../assets/cstk.svg';
import './CSTKScore.sass';

const Comp = ({ balances, effectiveBalance, getBalancesFor, getEffectiveBalancesFor }) => {
  const { address, isReady } = useContext(OnboardContext);

  React.useEffect(() => {
    if (isReady) {
      getBalancesFor(address);
      // getEffectiveBalancesFor(address);
    }
  }, [isReady, address, getBalancesFor]);

  React.useEffect(() => {
    if (isReady) {
      // getBalancesFor(address);
      getEffectiveBalancesFor(address);
    }
  }, [isReady, address, getEffectiveBalancesFor]);

  useEffect(() => {
    const interval = setInterval(() => {
      getEffectiveBalancesFor(address);
    }, 25000);
    return () => {
      clearInterval(interval);
    };
  });

  const [cstkBalance, setCstkbalance] = useState();

  useEffect(() => {
    let balance; // = '0';
    if (balances && balances[address]) {
      const userBalance = balances[address];
      const cstk = userBalance.find(b => b.symbol === 'CSTK');
      if (cstk) {
        balance = cstk.balanceFormatted;
      }
    }
    setCstkbalance(balance);
  }, [balances, address]);

  return (
    <>
      <p className="title is-text-overflow mb-2">Your CSTK Score</p>
      <div className="title level mb-04">
        <div className="is-size-6 level-left mb-04">
          <span className="icon has-text-light mr-02">
            <img src={CSTK} alt="CSTK" />
            &nbsp;
          </span>
          <span className="has-text-weight-bold" style={{ marginLeft: '4px' }}>
            {cstkBalance || '~'}&nbsp; CSTK
          </span>
        </div>
      </div>
      <div />
      {/* <div className="subtitle mb-05">Effective score: {effectiveBalance.toString()} CSTK</div> */}
      {effectiveBalance === 0 && (
        <div className="subtitle mb-05">You haven't paid your membership dues yet</div>
      )}
      {/* The following lines are commented to avoid confusion among users */}
      {/* <div className="is-flex is-align-items-center cstk-score">
        <div className="subtitle cstk-score-text">
          <span>Don't see you CSTK score in Metamask? Add your tokens to make them visible.</span>
        </div>
        <div
          className="subtitle"
          style={{
            color: '#1BDD9D',
            cursor: 'pointer',
            fontSize: '16px',
            marginLeft: '14px',
          }}
          onClick={addCSTK}
        >
          <div
            className="cstk-button"
            style={{
              padding: '4px',
              border: 'solid 1px #1BDD9D',
              borderRadius: '2px',
              whiteSpace: 'nowrap',
            }}
          >
            + Add to Metamask
          </div>
        </div>
      </div> */}
    </>
  );
};

const mapStateToProps = ({ balances, effectiveBalance }) => {
  return {
    balances,
    effectiveBalance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBalancesFor: address => dispatch({ type: 'GET_BALANCES_FOR_ADDRESS', address }),
    getEffectiveBalancesFor: address =>
      dispatch({ type: 'GET_EFFECTIVEBALANCE_FOR_ADDRESS', address }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
