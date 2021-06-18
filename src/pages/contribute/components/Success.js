import React from 'react';
import './Success.sass';
import Confetti from 'react-confetti';
import { Player } from '@lottiefiles/react-lottie-player';
import useWindowSize from 'react-use/lib/useWindowSize';
import { TwitterShareButton, TelegramShareButton, TwitterIcon, TelegramIcon } from 'react-share';
// import checkmark from '../../../assets/success_checkmark.svg';
// import { OnboardContext } from '../../../components/OnboardProvider';
import cstktoken from '../../../assets/cstk.svg';

const Success = () => {
  // const { addCSTK } = useContext(OnboardContext);

  const { width, height } = useWindowSize();

  return (
    <div>
      <Confetti width={width} height={height} colors={['#AECAAC']} recycle={false} />
      <div className="is-flex-direction-column is-justify-items-center">
        <div className="level">
          <div className="level-item">
            <div className="card">
              <div className="card-image">
                <p className="image is-64x64">
                  <img src={cstktoken} alt="CSTK logo" />
                </p>
              </div>
              <div className="is-overlay">
                <Player
                  autoplay
                  src="https://assets2.lottiefiles.com/packages/lf20_tAtUrg.json"
                  style={{ height: '64px', width: '64px' }}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="is-size-5 has-text-centered has-text-weight-bold">
          Thank you for the contribution
        </p>
        <br />
        <p className="has-text-centered pt-2">
          Redeem the Commons Stack swag with your CSLove tokens.
        </p>
        <p className="has-text-centered">
          <p className="control">
            <button aria-label="twitter" className="react-share__ShareButton button is-primary">
              <span className="icon" />
              <span>Share on Twitter</span>
            </button>
          </p>
        </p>
        <div className="button-container pt-6">
          <TwitterShareButton
            url="https://commonsstack.org/apply"
            title="I've just become a member of Commons Stack's Swiss Association! 🎉🌍🌌🎩🥂 Join us:"
          >
            <button className="button is-info">
              <TwitterIcon size={32} round className="mr-2" /> Share on Twitter
            </button>
          </TwitterShareButton>
          <TelegramShareButton
            url="https://commonsstack.org/apply"
            title="I've just become a member of Commons Stack's Swiss Association! 🎉🌍🌌🎩🥂 Join us!"
          >
            <button className="button is-info">
              <TelegramIcon size={32} round className="mr-2" /> Share on Telegram
            </button>
          </TelegramShareButton>
        </div>
      </div>
    </div>
  );
};

export default Success;
