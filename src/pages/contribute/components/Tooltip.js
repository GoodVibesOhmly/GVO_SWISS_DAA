import React from 'react';
import './Tooltip.sass';

const Tooltip = ({ children, active, content }) => {
  const [showToolTip, setShowToolTip] = React.useState(true);

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowToolTip(false);
    }, 500);
  };

  return (
    <div className="tooltip" onMouseEnter={() => setShowToolTip(true)}>
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
