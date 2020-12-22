import React from 'react';
import './Success.sass';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { TwitterShareButton, TelegramShareButton, TwitterIcon, TelegramIcon } from 'react-share';

const Success = () => {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti width={width} height={height} colors={['#AECAAC']} recycle={false} />

      <h1 className="is-size1">Thank you for the contribution</h1>

      <TwitterShareButton url="https://commonsstack.org" title="I funded the CS!">
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <TelegramShareButton url="https://commonsstack.org" title="I funded the CS!">
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </>
  );
};

export default Success;
