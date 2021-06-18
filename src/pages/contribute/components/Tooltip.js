import React from 'react';
import './Tooltip.sass';

const Tooltip = ({ children, active, content }) => {
  const [showToolTip, setShowToolTip] = React.useState(true);

  const delayedClose = timeout => {
    setTimeout(() => {
      setShowToolTip(false);
    }, timeout);
  };

  React.useEffect(() => {
    delayedClose(1500);
  }, []);

  const handleMouseLeave = () => {
    delayedClose(500);
  };

  return (
    <div
      className="tooltip"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tooltip-arrow" />
      {active && showToolTip && (
        <div className="tooltip-content" onMouseLeave={handleMouseLeave}>
          {content}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
