import React, { useContext, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { OnboardContext } from '../../../components/OnboardProvider';
import Cstk from '../../../assets/cslove.svg';

const Comp = ({ balances, getBalancesFor }) => {
  const { web3, address } = useContext(OnboardContext);

  const [cstkBalance, setCstkBalance] = React.useState(undefined);
  const [csloveBalance, setCSLoveBalance] = React.useState(undefined);

  const updateBalances = useCallback(() => {
    getBalancesFor(address);
  }, [address, getBalancesFor]);

  useEffect(() => {
    updateBalances();
    const interval = setInterval(updateBalances, 25000);
    return () => {
      clearInterval(interval);
    };
  }, [updateBalances]);

  useEffect(() => {
    if (balances && balances[address]) {
      balances[address].forEach(balance => {
        switch (balance.symbol) {
          case 'CSTK':
            setCstkBalance(balance.balance);
            break;
          case 'CSLOVE':
            setCSLoveBalance(balance.balanceFormatted);
            break;
          default: //
        }
      });
    }
  }, [balances, address]);

  return (
    <>
      <div className="container is-max-desktop notification is-primary has-text-left p-6">
        {web3 && address && (
          <>
            <p className="subtitle mb-2">YOUR CSLOVE BALANCE</p>
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <article className="media">
                    <figure className="media-left">
                      <p className="image is-64x64">
                        <img alt="CSTK logo" src={Cstk} />
                      </p>
                    </figure>
                    <div className="media-content">
                      <div className="content">
                        <p className="heading is-size-2 has-text-weight-bold">
                          {csloveBalance} CSLOVE
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            <div className="mb-3">
              Commons Stack loves the Trusted Seed! To prove it we airdrop CSLove tokens to all new
              members. The token allows you to pick any two items of swag from our shop!
            </div>
            {cstkBalance && cstkBalance.isEqualTo(0) ? (
              <>
                <div className="mb-3">
                  The very first thing you need to do before claiming your CSLove swag is to
                  activate your Trusted Seed Membership.
                </div>
                <div className="mb-3">
                  <p className="control">
                    <a rel="noreferrer" target="_blank" href="/" className="button is-success">
                      Activate Membership
                    </a>
                  </p>
                </div>
                <div className="mb-3">
                  Once your membership is activated, we will send the CSLove token to your Trusted
                  Seed wallet and some Rinkeby ETH to cover for transaction fees.
                </div>
              </>
            ) : (
              <>
                <div className="mb-3 title">Use your CSLove, claim your swag!</div>
                <div className="mb-3">
                  <span className="mr-3" role="img" aria-label="shopping">
                    🛍
                  </span>
                  Step 1: Go to the shop. Choose any two items you like. Check out and add your
                  shipping info.
                </div>
                <div className="mb-3">
                  <p className="control">
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href="https://cslove.commonsstack.org/"
                      className="button is-success"
                    >
                      Go to Swag Shop
                    </a>
                  </p>
                </div>
                <div className="mb-3">
                  <span className="mr-3" role="img" aria-label="money">
                    💸
                  </span>
                  Step 2: Connect Metamask and switch to the Rinkeby network. Choose Cryptocurrency
                  and CSLove as payment method and hit the pay button!
                </div>
                <div className="mb-3 title">
                  We can't wait to see you sporting Commons Stack swag!!
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    balances: state.balances,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBalancesFor: address => dispatch({ type: 'GET_BALANCES_FOR_ADDRESS', address }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
