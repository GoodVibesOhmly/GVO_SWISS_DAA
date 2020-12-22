import React from 'react';
import { connect } from 'react-redux';
import DAI from 'cryptocurrency-icons/svg/color/dai.svg';
import BN from 'bn.js';
import Spinner from './Spinner';
import './Slider.sass';

// eslint-disable-next-line no-unused-vars
const Slider = ({ softCap, hardCap, totalReceived, loading }) => {
  // const getProgressBarStyles = ({ _softCap, _hardCap, _totalReceived }) => {
  //     let fill, shadow, full;

  //     if (_totalReceived < _softCap) {
  //         fill = (_totalReceived / _hardCap) * 100;
  //         shadow = ((_softCap - _totalReceived) / _hardCap) * 100;
  //         full = ((_hardCap - _softCap) / _hardCap) * 100;
  //     } else {
  //         fill = (_softCap / _hardCap) * 100;
  //         shadow = ((_totalReceived - _softCap) / _hardCap) * 100;
  //         full = ((_hardCap - _totalReceived) / _hardCap) * 100;
  //     }

  //     return {
  //         fill,
  //         shadow,
  //         full,
  //     };
  // };

  //   const _softCap =
  //     softCap && softCap.div(new BN("1000000000000000000")).toString(10);
  //   const _hardCap =
  //     hardCap && hardCap.div(new BN("1000000000000000000")).toString(10);
  const _totalReceived =
    totalReceived && totalReceived.div(new BN('1000000000000000000')).toString(10);

  // Just for testing purposes
  // const _softCap = 18;
  // const _hardCap = 20;
  // const _totalReceived = 19;
  // const _softCap = 18;
  // const _hardCap = 20;
  // const _totalReceived = 10;

  //   const progressBarStyles = getProgressBarStyles({
  //     _softCap,
  //     _hardCap,
  //     _totalReceived,
  //   });

  return (
    <div>
      <span className="subtitle">Total contributed to date </span>
      <span className="icon is-small has-text-light">
        <img src={DAI} alt={DAI} />
        &nbsp;
      </span>
      <span className="linear-gradient-text">
        {loading ? <Spinner /> : <span>{_totalReceived} DAI</span>}
      </span>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    softCap: state.softCap,
    hardCap: state.hardCap,
    totalReceived: state.totalReceived,
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(Slider);
