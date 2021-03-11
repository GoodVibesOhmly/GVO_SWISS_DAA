import React from 'react';
import './Tooltip.sass';

const Tooltip = ({ children, active, content }) => {
  const [showToolTip, setShowToolTip] = React.useState(true);

  return (
    <div
      className="tooltip"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      <div className="tooltip-arrow" />
      {active && showToolTip && <div className="tooltip-content">{content}</div>}
      {children}
    </div>
  );
};

export default Tooltip;
