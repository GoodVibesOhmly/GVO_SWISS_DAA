import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import WalletView from './WalletView';
import Contribute from './Contribute';
import CSTKScore from './CSTKScore';

const Comp = ({ address, pendingBalance, balances }) => {
  const [showPendingScore, setShowPendingScore] = useState(false);

  useEffect(() => {
    if (balances && balances[address]) {
      const userBalance = balances[address];
      const cstkBalance = userBalance.find(b => b.symbol === 'CSTK');
      if (cstkBalance && cstkBalance === 0 && pendingBalance > 0) {
        setShowPendingScore(true);
      }
    }
  }, [balances, address]);

  return (
    <>
      <section className="section has-text-left">
        <div className="tile is-ancestor">
          <div className="tile is-4 is-vertical is-parent  ">
            <article className="is-child notification is-primary">
              <WalletView />
            </article>
            {showPendingScore && (
              <article className="is-child notification is-primary">
                <CSTKScore />
              </article>
            )}
          </div>
          <div className="tile is-parent">
            <Contribute />
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = ({ address, pendingBalance, balances }) => {
  return {
    address,
    pendingBalance,
    balances,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAgreed: () => dispatch({ type: 'AGREE_TANDC' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
