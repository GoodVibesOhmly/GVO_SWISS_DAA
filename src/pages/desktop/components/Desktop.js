import React from 'react';
import { connect } from 'react-redux';

import './Desktop.sass';

const Comp = () => {
  return (
    <>
      <div className="container ">
        <div className="tile is-horizontal is-parent">
          <article className="tile is-child notification desktop-card">
            <div className="pb-4 is-size-4">
              <i className="fas fa-mobile-alt" />
            </div>
            <div className="pb-4">The Commons Stack Membership DApp is currently desktop only.</div>
            <div>
              Read more about Commons Stack and the Trusted Seed in{' '}
              <a
                href="https://medium.com/commonsstack/join-the-commons-stacks-trusted-seed-swiss-association-ed51a356cb6c"
                target="_blank"
                rel="noreferrer"
              >
                this article
              </a>
              .
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default connect()(Comp);
