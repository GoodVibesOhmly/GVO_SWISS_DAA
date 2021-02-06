import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { OnboardContext } from '../../../components/OnboardProvider';

const Comp = ({ balances, getBalancesFor }) => {
  const { address, isReady } = useContext(OnboardContext);

  // TODO: this should be moved to the store IMO
  React.useEffect(() => {
    if (isReady) {
      getBalancesFor(address);
    }
  }, [isReady, address, getBalancesFor]);

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

  if (!cstkBalance) {
    return null;
  }

  return (
    <>
      <p className="title is-text-overflow mb-2">Your CSTK Score</p>
      <div className="subtitle mb-05">Pending score: {cstkBalance} CSTK</div>
    </>
  );
};

const mapStateToProps = ({ balances }) => {
  return {
    balances,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onSetAgreed: () => dispatch({ type: "AGREE_TANDC" }),
    getBalancesFor: address => {
      dispatch({ type: 'GET_BALANCES_FOR_ADDRESS', address });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
