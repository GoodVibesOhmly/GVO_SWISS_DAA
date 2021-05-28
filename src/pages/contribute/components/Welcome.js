import React from 'react';
import { connect } from 'react-redux';
import WalletView from './WalletView';
import Contribute from './Contribute';
import PendingBalance from './PendingBalance';

const Comp = () => {
  return (
    <>
      <section className="section has-text-left">
        <div className="tile is-ancestor">
          <div className="tile is-4 is-vertical is-parent  ">
            <article className="is-child notification is-primary">
              <WalletView />
            </article>
            <PendingBalance />
          </div>
          <div className="tile is-parent">
            <Contribute />
          </div>
        </div>
      </section>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAgreed: () => dispatch({ type: 'AGREE_TANDC' }),
  };
};

export default connect(mapDispatchToProps)(Comp);
