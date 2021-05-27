import React from 'react';
import { connect } from 'react-redux';

import './Burn.sass';
import elmo from '../../../assets/elmo.jpg';

const Comp = () => {
  return (
    <>
      <div className="notification is-primary burn-card">
        <div className="pb-4 is-size-4">
          <span role="img" aria-label="Burn">
            🔥
          </span>
        </div>
        <div className="pb-4 heading is-size-2 has-text-weight-bold">Token Burn In Progress…</div>
        <div className="pb-4">
          <b>Wait, What?! You’re Burning CSTK?</b> Don’t worry, your CSTK Score is recoverable. The
          Commons Stack team will keep track of your CSTK Score off-chain for when you activate in
          the future. This includes CSTK earned through praise or other routes — it’s all logged for
          later.
        </div>
        <div className="pb-4">
          Read more about the burn and the Trusted Seed in{' '}
          <a
            href="https://medium.com/commonsstack/last-chance-to-activate-your-trusted-seed-membership-86f8d5b0e5fd"
            target="_blank"
            rel="noreferrer"
          >
            this article
          </a>
          .
        </div>
        <div>
          <img src={elmo} alt="Elmo" />
        </div>
      </div>
    </>
  );
};

export default connect()(Comp);
