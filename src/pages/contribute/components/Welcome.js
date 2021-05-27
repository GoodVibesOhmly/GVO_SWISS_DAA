import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import WalletView from './WalletView';
import Contribute from './Contribute';
import CSTKScore from './CSTKScore';
import { OnboardContext } from '../../../components/OnboardProvider';

const Comp = ({ effectiveBalance }) => {
  const { isReady } = useContext(OnboardContext);
  const [showPendingScore, setShowPendingScore] = useState(false);

  React.useEffect(() => {
    if (isReady) {
      setShowPendingScore(effectiveBalance > 0);
    }
  }, [isReady, effectiveBalance]);

  return (
    <>
      <section className="section has-text-left">
        <div className="tile is-ancestor">
          <div className="tile is-4 is-vertical is-parent  ">
            <article className="is-child notification is-primary">
              <WalletView />
            </article>
            {showPendingScore ? null : (
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

const mapStateToProps = state => {
  return {
    effectiveBalance: state.effectiveBalance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAgreed: () => dispatch({ type: 'AGREE_TANDC' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
