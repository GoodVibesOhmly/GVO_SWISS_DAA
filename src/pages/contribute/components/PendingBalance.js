import React from 'react';
import { connect } from 'react-redux';
import CSTK from '../../../assets/cstk.svg';
import './PendingBalance.sass';

const Comp = ({ pendingBalance }) => {
  if (pendingBalance === '0') return null;

  return (
    <article className="is-child notification is-primary">
      <p className="title is-text-overflow mb-2">Your Pending Membership Score</p>
      <div className="title level mb-04">
        <div className="is-size-6 level-left mb-04">
          <span className="icon has-text-light mr-02">
            <img src={CSTK} alt="CSTK" />
            &nbsp;
          </span>
          <span className="has-text-weight-bold" style={{ marginLeft: '4px' }}>
            {pendingBalance || '~'}&nbsp; CSTK
          </span>
        </div>
      </div>
      <div />
      <div className="subtitle mb-05">You haven't paid your membership dues yet</div>
    </article>
  );
};

const mapStateToProps = state => {
  return {
    pendingBalance: state.pendingBalance,
  };
};

export default connect(mapStateToProps)(Comp);
