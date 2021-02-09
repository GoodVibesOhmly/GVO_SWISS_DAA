import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { OnboardContext } from '../../../components/OnboardProvider';

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
      <div className="subtitle mb-05">Pending score: {cstkBalance || 0} CSTK</div>
      {/* <div className="subtitle mb-05">Effective score: {effectiveBalance.toString()} CSTK</div> */}
      {effectiveBalance && effectiveBalance.toString() === '0' && (
        <div className="subtitle mb-05">You haven't paid your membership dues yet</div>
      )}
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
