import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { OnboardContext } from '../../../components/OnboardProvider';
import tandcData from '../../../assets/tandc.json';
import './TandC.sass';

const Comp = ({ onSetAgreedtandc }) => {
  const { web3, address } = useContext(OnboardContext);

  const [agreetandc, setAgreetandc] = React.useState(false);
  const [box3, setBox3] = React.useState(false);
  const [enableSubmit, setEnableSubmit] = React.useState(false);

  const [signError, setSignError] = React.useState();

  React.useEffect(() => {
    setEnableSubmit(agreetandc && box3);
    // console.log(
    //   'Check all ??',
    //   agreetandc ? 'true' : 'false',
    //   box3 ? 'true' : 'false',
    //   enableSubmit ? 'true' : 'false',
    // );
  }, [setEnableSubmit, enableSubmit, agreetandc, box3]);

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
      onSetAgreedtandc(message, signature, address);
    });
  };

  return (
    <>
      <div className="tandc modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Terms And Conditions</p>
            {/* <button
              className="delete"
              onClick={() => {
                setShowTandC(false);
              }}
              aria-label="close"
            ></button> */}
          </header>
          <div className="is-divider" />
          <section className="modal-card-body">
            {/* <p className="tandccontent">{tandcData.data}</p> */}

            <embed
              className="tandccontent"
              src={`https://ipfs.web3.party/ipfs/${tandcData.hash}`}
              width="100%"
            />

            <div className="field">
              <div className="control">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="checkbox">
                  <input
                    name="agreetandc"
                    type="checkbox"
                    checked={agreetandc}
                    onChange={e => {
                      setAgreetandc(e.target.checked);
                    }}
                  />
                  I agree to these terms and conditions
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
                    I agree to cryptographically sign a copy of these Terms and Conditions by
                    signing its IPFS hash{' '}
                    <a target="_new" href={`https://ipfs.io/ipfs/${tandcData.hash}`}>
                      {tandcData.hash}
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
                  <span className="icon has-text-info is-medium">
                    <i className="fas fa-info-circle" />
                  </span>
                  <span className="is-size-7 px-4">
                    Be sure to connect the address you submitted in your Trusted Seed application.
                    That address will be in the CSTK registry and will be where you hold your CSTK
                    score and pay membership dues from.
                  </span>
                </div>
              </div>
              <div className="is-vertical ">
                <div>
                  <button
                    disabled={!enableSubmit}
                    onClick={() => {
                      signIt(
                        `I agree with Terms and Conditions corresponding to IPFS hash ${tandcData.hash}`,
                      );
                    }}
                    className="button is-pulled-right is-outlined is-success"
                  >
                    Sign with my wallet
                  </button>
                  {signError && <p className="help is-danger">{signError}</p>}
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
    agreedtandc: state.agreedtandc,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAgreedtandc: (message, signature, address) =>
      dispatch({ type: 'AGREE_TANDC', message, signature, address }),
    setShowTandC: value => dispatch({ type: 'SET_SHOW_TANDC', value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
