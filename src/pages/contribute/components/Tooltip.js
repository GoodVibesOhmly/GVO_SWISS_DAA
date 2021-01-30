import React from 'react';
import './ToolTip.sass';
import './DonateModal.sass';

const ToolTip = ({ children, active }) => {
  const [showToolTip, setShowToolTip] = React.useState(true);

  return (
    <div
      className="tooltip"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      <div className="tooltip-arrow" />
      {active && showToolTip && (
        <div className="tooltip-content">
          <p>
            If you contribute this amount you will have reached your max. trust score, the max
            amount of CSTK tokens you will receive. If you want to increase the max. score
            please&nbsp;
            <a
              href="mailto:info@commonsstack.foundation"
              subject="I have a problem getting CSTK tokens"
              className="support-link"
              style={{ color: '#1BDD9D', textDecoration: 'none' }}
            >
              contact us
            </a>
            .
          </p>
          <br />
          <p>
            You can decrease contribution to match you max. trust score or continue and remaning
            funs will be donated to the Commons Stack.
          </p>
        </div>
      )}
      {children}
    </div>
  );
};

export default ToolTip;
