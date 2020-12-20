import React, { useContext } from 'react';
// import { Redirect } from "react-router-dom";
// import styled from "styled-components";
import { connect } from 'react-redux';
import WalletButton from '../../../components/WalletButton';
import { OnboardContext } from '../../../components/OnboardProvider';

const Comp = () => {
  const { web3 } = useContext(OnboardContext);
  if (!web3) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Welcome to the TECH token admin page</h1>
          <h2 className="subtitle">
            Please connect your <strong>Wallet</strong> to continue. Click the button below...
          </h2>
          <WalletButton />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">Welcome to the whitelist admin page</h1>
        </div>
      </section>

      {/* <TomatoButton onClick={onSetweb3available}>click to agree</TomatoButton> */}
    </>
  );
};

const mapStateToProps = () => {
  return {};
};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
