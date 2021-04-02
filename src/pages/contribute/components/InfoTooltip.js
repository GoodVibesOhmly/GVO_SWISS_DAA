import React from 'react';
import './InfoTooltip.sass';

const InfoTooltip = ({ children }) => {
  const [showToolTip, setShowToolTip] = React.useState(false);

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowToolTip(false);
    }, 500);
  };

  return (
    <div className="info-tooltip is-inline-block">
      {showToolTip && <div className="info-tooltip-content is-size-7">{children}</div>}
      <span
        className="icon info-icon"
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => handleMouseLeave()}
      >
        <i className="fas fa-info-circle" />
      </span>
    </div>
  );
};

export default InfoTooltip;
