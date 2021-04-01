import React from 'react';
import { connect } from 'react-redux';

const Comp = () => {
  return (
    <>
      <div className="container">
        <div className="tile is-horizontal is-parent">
          <article className="tile is-child notification is-primary">
            <div className="pb-2">
              <i className="fas fa-mobile-alt" />
            </div>
            <div>The Commons Stack Membership DApp is currently desktop only.</div>
          </article>
        </div>
      </div>
    </>
  );
};

export default connect()(Comp);
