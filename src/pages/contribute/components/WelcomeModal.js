import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { OnboardContext } from '../../../components/OnboardProvider';

import './WelcomeModal.sass';

const Comp = ({ setShowWelcome }) => {
  const { web3, onboard, address } = useContext(OnboardContext);

  const handleButtonClick = () => {
    setShowWelcome(false);
    if ((!web3 || !address) && onboard) {
      onboard.walletSelect().then(walletSelected => {
        if (walletSelected) {
          onboard.walletCheck();
        }
      });
    }
  };

  return (
    <>
      <div className="welcomemodal modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <section className="modal-card-body">
            <p className="modal-card-title">Welcome to the Trusted Seed's Swiss Membership DApp!</p>
            <p className="modal-card-subtitle">
              If you have already been accepted into the Trusted Seed, activate your membership now.
            </p>
            <p>Your next steps:</p>
            <div className="columns is-2 is-variable">
              <div className="column is-narrow">
                <span className="numberCircle">1</span>
              </div>
              <div className="column ">Sign in with you wallet</div>
            </div>
            <div className="columns is-2 is-variable">
              <div className="column is-narrow">
                <span className="numberCircle">2</span>
              </div>
              <div className="column ">Sign the Statutes and the Terms & Conditions</div>
            </div>
            <div className="columns is-2 is-variable">
              <div className="column is-narrow">
                <span className="numberCircle">3</span>
              </div>
              <div className="column ">
                Pay your membership dues (for which you will need DAI and a little ETH in your
                wallet)
              </div>
            </div>
            <div>
              <button className="letsgo-button button is-success " onClick={handleButtonClick}>
                Let's go!
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => {
  return {
    setShowWelcome: value => dispatch({ type: 'SET_SHOW_WELCOME', value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
