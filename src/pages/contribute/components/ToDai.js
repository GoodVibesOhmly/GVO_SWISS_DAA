import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { OnboardContext } from '../../../components/OnboardProvider';

const Aggregator = require('@chainlink/contracts/abi/v0.4/AggregatorInterface.json');

const Comp = ({ balance, coin }) => {
  const [convertedBalance, setConvertedBalance] = React.useState(false);

  const { web3 } = useContext(OnboardContext);

  if (!balance || !coin) {
    return;
  }
  if (!web3) {
    return;
  }

  // x to DAI known contracts
  /// check https://feeds.chain.link/
  const aggregatorContracts = [
    {
      coin: 'ETH',
      aggregatorAddress: '0x037E8F2125bF532F3e228991e051c8A7253B642c',
    },
  ];

  const aggregatorContract = aggregatorContracts.find(item => {
    return item.coin === coin;
  });

  if (!aggregatorContract) {
    return <div>?</div>;
  }

  const aggregator = new web3.eth.Contract(
    Aggregator.compilerOutput.abi,
    aggregatorContract.aggregatorAddress,
  );
  aggregator.methods
    .latestAnswer()
    .call()
    .then(res => {
      // debugger;
      const BNbalance = new web3.utils.BN(balance);
      const BNrate = new web3.utils.BN(res);
      const amount = BNbalance.div(BNrate); // .div(new web3.utils.BN("10e36"));
      setConvertedBalance(amount.toNumber(10));
    });

  return (
    <>
      <span>~{convertedBalance}</span>
    </>
  );
};

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => {
  return {};
};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
