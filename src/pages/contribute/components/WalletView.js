import React, { useContext } from 'react';
import { connect } from 'react-redux';
import ETH from 'cryptocurrency-icons/svg/color/eth.svg';
import DAI from '../../../assets/dai.svg';
import { OnboardContext } from '../../../components/OnboardProvider';
import CSTK from '../../../assets/cstk.svg';
import CSLove from '../../../assets/cslove.svg';
import TandC from './TandC';
import Statutes from './Statutes';
import tandcData from '../../../assets/tandc.json';
import statutesData from '../../../assets/statutes.json';
import InfoTooltip from './InfoTooltip';

const coinLogos = [
  { symbol: 'DAI', src: DAI },
  { symbol: 'ETH', src: ETH },
  { symbol: 'CSTK', src: CSTK },
  { symbol: 'CSLOVE', src: CSLove },
];

const Comp = ({
  loadedtandc,
  agreedtandc,
  loadedstatutes,
  agreedstatutes,
  balances,
  getBalancesFor,
  getUserState,
  userIsWhiteListed,
}) => {
  const { web3, address, isReady } = useContext(OnboardContext);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, getUserState]);
  // TODO: Will be pulled form the state, just for now
  const defaultCoins = [
    {
      symbol: 'CSLOVE',
      contractaddress: '0x4D64A862e0eFb94b1d2A84A67F7a2d669AFA8eDf',
    },
    {
      symbol: 'DAI',
      contractaddress: '0xad6d458402f60fd3bd25163575031acdce07538d',
    },
    {
      symbol: 'ETH',
    },
  ];

  const coins = (balances && balances[address] && balances[address]) || defaultCoins;

  // DAI balance
  // const daiBalance = coins
  //   .filter(coin => {
  //     return coin.symbol === 'DAI';
  //   })
  //   .map(coin => {
  //     const logo = coinLogos.find(coinIcon => {
  //       return coinIcon.symbol === coin.symbol;
  //     });
  //     return (
  //       isReady && (
  //         <div key={coin.symbol} className="title level mb-04">
  //           <div className="is-size-6 level-left mb-04">
  //             <span className="icon has-text-light mr-02">
  //               <img src={logo.src} alt={coin.symbol} />
  //               &nbsp;
  //             </span>
  //             <span className="has-text-weight-bold" style={{ marginLeft: '4px' }}>
  //               {coin.status || coin.balanceFormatted || '~'}&nbsp;
  //               {coin.symbol}
  //             </span>
  //           </div>
  //         </div>
  //       )
  //     );
  //   });

  // all other known balances - except DAI and CSTK
  const coinBalances = coins.reduce((accum, coin) => {
    if (['CSTK'].includes(coin.symbol)) return accum;
    const logo = coinLogos.find(coinIcon => {
      return coinIcon.symbol === coin.symbol;
    });

    accum.push(
      <div key={coin.symbol} className="title level mb-04">
        <div className="is-size-7 has-text-grey-light level-left mb-04">
          <span className="icon has-text-light mr-2">
            <img src={logo.src} alt={coin.symbol} />
            &nbsp;
          </span>
          {coin.symbol}
        </div>
        {balances && balances[address] ? (
          <div className="subtitle level-right mb-04">
            {coin.balanceFormatted} {coin.symbol}
          </div>
        ) : (
          <div className="subtitle level-right mb-04">{/* <span>~DAI</span> */}</div>
        )}
      </div>,
    );
    return accum;
  }, []);

  if (userIsWhiteListed && loadedtandc && !agreedtandc && address) {
    return <TandC />;
  }
  if (agreedtandc && loadedstatutes && !agreedstatutes && address) {
    return <Statutes />;
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
            <span className="is-size-7">
              Sign{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://ipfs.web3.party/ipfs/${tandcData.hash}`}
              >
                Terms and Conditions
              </a>
            </span>
            <InfoTooltip>
              The Terms & Conditions apply to your membership of the Trusted Seed's Swiss
              Association. It covers planned activities, membership, rights & duties, membership
              score, risks, etc.
            </InfoTooltip>
          </div>
          <div className="level-left">
            {agreedstatutes ? successIcon : failIcon}
            <span className="is-size-7">
              Sign{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://ipfs.web3.party/ipfs/${statutesData.hash}`}
              >
                Statutes
              </a>
            </span>
            <InfoTooltip>
              The Statutes describe and regulate the structure and governance of the Trusted Seed's
              Swiss Association.
            </InfoTooltip>
          </div>

          <div className="level-left">
            {userIsWhiteListed ? successIcon : failIcon}
            <span className="is-size-7">Member of the Trusted Seed (Registry)</span>
          </div>
        </div>
      </div>
      <br />
      <span className="title is-text-overflow mb-2">
        Total Available Balance{' '}
        {address && isReady ? (
          <a
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-info-circle is-size-7" />
          </a>
        ) : null}
      </span>

      {address && isReady ? (
        <>
          <p className="truncate is-size-7 mb-2">{address}</p>
          {coinBalances}
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

const mapStateToProps = ({
  balances,
  agreedtandc,
  loadedtandc,
  agreedstatutes,
  loadedstatutes,
  userIsWhiteListed,
}) => {
  return {
    agreedtandc,
    loadedtandc,
    agreedstatutes,
    loadedstatutes,
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
      dispatch({ type: 'READ_SHOW_STATUTES', address });
      dispatch({ type: 'GET_USER_IS_WHITELISTED', address });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
