import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { OnboardContext } from '../../../components/OnboardProvider';
import statutesData from '../../../assets/statutes.json';
import './Statutes.sass';

const Comp = ({ onSetAgreedstatutes }) => {
  const { web3, address } = useContext(OnboardContext);

  const [agreestatutes, setAgreestatutes] = React.useState(false);
  const [box3, setBox3] = React.useState(false);
  const [enableSubmit, setEnableSubmit] = React.useState(false);

  const [signError, setSignError] = React.useState();

  React.useEffect(() => {
    setEnableSubmit(agreestatutes && box3);
    // console.log(
    //   'Check all ??',
    //   agreestatutes ? 'true' : 'false',
    //   box3 ? 'true' : 'false',
    //   enableSubmit ? 'true' : 'false',
    // );
  }, [setEnableSubmit, enableSubmit, agreestatutes, box3]);

  if (!web3) {
    return <div>Waiting for web3 provider</div>;
  }

  const signIt = message => {
    const from = web3.currentProvider.selectedAddress;

    web3.eth.personal.sign(message, from, '', (err, signature) => {
      if (err) {
        return setSignError('Signature failed.');
      }

      if (!signature) {
        return setSignError('No signature received.');
      }
      onSetAgreedstatutes(message, signature, address);
    });
  };

  return (
    <>
      <div className="tandc modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Statutes</p>
            {/* <button
              className="delete"
              onClick={() => {
                setShowstatutes(false);
              }}
              aria-label="close"
            ></button> */}
          </header>
          <div className="is-divider" />
          <section className="modal-card-body">
            <embed
              className="statutescontent"
              src={`https://ipfs.web3.party/ipfs/${statutesData.hash}`}
              width="100%"
            />

            <div className="field">
              <div className="control">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="checkbox">
                  <input
                    name="agreestatutes"
                    type="checkbox"
                    checked={agreestatutes}
                    onChange={e => {
                      setAgreestatutes(e.target.checked);
                    }}
                  />
                  I agree to these statutes
                </label>
              </div>
            </div>
            <div className="field">
              <div className="control">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="checkbox">
                  <input
                    name="box3"
                    type="checkbox"
                    checked={box3}
                    onChange={e => {
                      setBox3(e.target.checked);
                    }}
                  />
                  <span>
                    I agree to cryptographically sign a copy of these statutes by signing its IPFS
                    hash{' '}
                    <a target="_new" href={`https://ipfs.io/ipfs/${statutesData.hash}`}>
                      {statutesData.hash}
                    </a>
                  </span>
                </label>
              </div>
            </div>
          </section>
          <div className="is-divider" />
          <footer className="modal-card-foot">
            <div className="tile is-ancestor">
              <div className="tile is-vertical ">
                <div className="level">
                  <div className="level-left">
                    <span className="icon has-text-info is-medium">
                      <i className="fas fa-info-circle" />
                    </span>
                    <span className="is-size-7">
                      Be sure to connect the right wallet which will be whitelisted and from which
                      you will make contribution
                    </span>
                    {signError && <p className="help is-danger">{signError}</p>}
                  </div>
                </div>
              </div>
              <div className="tile is-vertical ">
                <div className="">
                  <button
                    disabled={!enableSubmit}
                    onClick={() => {
                      signIt(
                        `I agree with statutes corresponding to IPFS hash ${statutesData.hash}`,
                      );
                    }}
                    className="button is-pulled-right is-outlined is-success"
                  >
                    Sign with my wallet
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    agreedstatutes: state.agreedstatutes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAgreedstatutes: (message, signature, address) =>
      dispatch({ type: 'AGREE_STATUTES', message, signature, address }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
