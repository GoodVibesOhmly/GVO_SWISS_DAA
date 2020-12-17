import React, { useContext } from 'react';
import { connect } from 'react-redux';
import DAI from 'cryptocurrency-icons/svg/color/dai.svg';
import ETH from 'cryptocurrency-icons/svg/color/eth.svg';
import { OnboardContext } from '../../../components/OnboardProvider';
import CSTK from '../../../assets/cstk.svg';
import TandC from './TandC';

const coinLogos = [
  { symbol: 'DAI', src: DAI },
  { symbol: 'ETH', src: ETH },
  { symbol: 'CSTK', src: CSTK },
  // { symbol: "ANT", src: ANT },
  // { symbol: "BAT", src: BAT },
];

const Comp = ({
  agreedtandc,
  showtandc,
  balances,
  getBalancesFor,
  getUserState,
  userIsWhiteListed,
}) => {
  const { web3, address, onboard, network, isReady } = useContext(OnboardContext);

  // TODO: this should be moved to the store IMO
  React.useEffect(() => {
    if (isReady) {
      getBalancesFor(address);
    }
  }, [isReady, address, getBalancesFor]);

  React.useEffect(() => {
    if (web3 && address) {
      getUserState(address);
    }
  }, [onboard, web3, address, network, getUserState]);
  // TODO: Will be pulled form the state, just for now
  const defaultCoins = [
    {
      symbol: 'DAI',
      contractaddress: '0xad6d458402f60fd3bd25163575031acdce07538d',
    },
    {
      symbol: 'ETH',
    },
    // {
    //   symbol: "ANT",
    // },
    // {
    //   symbol: "BAT",
    // },
  ];

  const coins = (balances && balances[address] && balances[address]) || defaultCoins;

  // DAI balance
  const daiBalance = coins
    .filter(coin => {
      return coin.symbol === 'DAI';
    })
    .map(coin => {
      const logo = coinLogos.find(coinIcon => {
        return coinIcon.symbol === coin.symbol;
      });
      return (
        isReady && (
          <div key={coin.symbol} className="title is-6 level mb-04">
            <div className="level-left mb-04">
              <span>Total available balance</span>
              <span className="icon info-icon-small is-small has-text-info">
                <i className="fas fa-info-circle" />
              </span>
            </div>
            <div className="level-right has-text-right">
              {coin.status || coin.balanceFormatted || '~'} {coin.symbol}{' '}
              <span className="icon is-small has-text-light">
                &nbsp;
                <img src={logo.src} alt={coin.symbol} />
              </span>
            </div>
          </div>
        )
      );
    });

  // all other known balances - except DAI
  const otherBalances = coins.reduce((accum, coin) => {
    if (coin.symbol === 'DAI') return accum;
    const logo = coinLogos.find(coinIcon => {
      return coinIcon.symbol === coin.symbol;
    });

    accum.push(
      <div key={coin.symbol} className="title level mb-04">
        <div className="subtitle level-left mb-04">
          <span className="icon has-text-light mr-02">
            <img src={logo.src} alt={coin.symbol} />
            &nbsp;
          </span>{' '}
          {coin.symbol}
        </div>
        {balances && balances[address] ? (
          <div className="subtitle level-right">
            {coin.balanceFormatted} {coin.symbol}
          </div>
        ) : (
          <div className="subtitle level-right">
            <span>~DAI</span>
          </div>
        )}
      </div>,
    );
    return accum;
  }, []);

  if (showtandc && address) {
    return <TandC />;
  }

  const successIcon = (
    <>
      <span className="icon has-text-success">
        <i className="fas fa-check-circle" />
      </span>
    </>
  );

  const failIcon = (
    <span className="icon">
      <i className="fas fa-times-circle" />
    </span>
  );
  return (
    <>
      <p className="title is-text-overflow mb-2">Membership Terms</p>
      <div className="subtitle mb-05">
        <div className="title-level">
          <div className="level-left">
            {agreedtandc ? successIcon : failIcon}
            <span className="is-size-7">Sign Terms and Conditions</span>
          </div>
          <div className="level-left">
            {userIsWhiteListed ? successIcon : failIcon}
            <span className="is-size-7">Member of the Trusted Seed (Allowlist)</span>
          </div>
        </div>
      </div>
      <br />
      <p className="title is-text-overflow mb-2">Total Available Balance</p>

      {address && isReady ? (
        <>
          {daiBalance}
          {otherBalances}
        </>
      ) : (
        <>
          <br />
          <br />
          <p className="subtitle mb-1 has-text-centered is-italic">
            Connect wallet to verify membership terms and your CSTK Score
          </p>
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ showtandc, balances, agreedtandc, userIsWhiteListed }) => {
  return {
    showtandc,
    agreedtandc,
    balances,
    userIsWhiteListed,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onSetAgreed: () => dispatch({ type: "AGREE_TANDC" }),
    getBalancesFor: address => {
      dispatch({ type: 'GET_BALANCES_FOR_ADDRESS', address });
    },
    getUserState: address => {
      dispatch({ type: 'READ_SHOW_TANDC', address });
      dispatch({ type: 'GET_USER_IS_WHITELISTED', address });
    },
    setShowTandC: value => dispatch({ type: 'SET_SHOW_TANDC', value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
