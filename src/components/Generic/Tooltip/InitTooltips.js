import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Tooltip from './';

const TooltipManager = ({ tooltip }) => {
  return tooltip.visible ? (
    <Tooltip content={tooltip.content} position={tooltip.position} coords={tooltip.coords} />
  ) : null;
};

const TooltipWrapper = () => {
  const [tooltip, setTooltip] = useState({ visible: false, content: '', position: 'top', coords: { x: 0, y: 0 } });

  const showTooltip = (content, position, coords) => {
    setTooltip({ visible: true, content, position, coords });
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, content: '', position: 'top', coords: { x: 0, y: 0 } });
  };

  const handleMouseOver = (event) => {
    const target = event.target.closest('[data-toggle="tooltip"]');
    if (target) {
      const content = target.getAttribute('data-text');
      const position = target.getAttribute('data-placement') || 'top';
      const rect = target.getBoundingClientRect();
      const coords = { x: rect.left + window.scrollX, y: rect.top + window.scrollY };
      showTooltip(content, position, coords);
    }
  };

  const handleMouseOut = (event) => {
    const target = event.relatedTarget && event.relatedTarget.closest('[data-toggle="tooltip"]');
    if (!target) {
      hideTooltip();
    }
  };

  useEffect(() => {
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return <TooltipManager tooltip={tooltip} />;
};

const InitTooltips = () => {
  if (typeof window !== 'undefined') {
    const tooltipContainer = document.createElement('div');
    document.body.appendChild(tooltipContainer);
    const root = ReactDOM.createRoot(tooltipContainer);
    root.render(<TooltipWrapper />);
  }
};

export default InitTooltips;
