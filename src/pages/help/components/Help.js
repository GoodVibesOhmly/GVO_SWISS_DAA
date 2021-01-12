import React from 'react';
import { connect } from 'react-redux';

const Comp = () => {
  return (
    <>
      <section className="section has-text-left">
        <div className="tile is-ancestor">
          <h1>Test</h1>
        </div>
      </section>
    </>
  );
};

export default connect()(Comp);
