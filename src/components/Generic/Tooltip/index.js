/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Tooltip = ({ content, position, coords }) => {
  if (!content) return null;
  const tooltipRef = useRef(null);
  const getAdjustedCoords = (coords, tooltipRect, position) => {
    const { innerWidth, innerHeight } = window;

    let adjustedCoords = { ...coords };

    if (position === 'top' || position === 'bottom') {
      if (coords.x + tooltipRect.width / 2 > innerWidth) {
        adjustedCoords.x = innerWidth - tooltipRect.width / 2;
      } else if (coords.x - tooltipRect.width / 2 < 0) {
        adjustedCoords.x = tooltipRect.width / 2;
      }
    }

    if (position === 'left' || position === 'right') {
      if (coords.y + tooltipRect.height / 2 > innerHeight) {
        adjustedCoords.y = innerHeight - tooltipRect.height / 2;
      } else if (coords.y - tooltipRect.height / 2 < 0) {
        adjustedCoords.y = tooltipRect.height / 2;
      }
    }

    return adjustedCoords;
  };



  useEffect(() => {
    const tooltipEl = tooltipRef.current;
    if (tooltipEl) {
      const tooltipRect = tooltipEl.getBoundingClientRect();
      const adjustedCoords = getAdjustedCoords(coords, tooltipRect, position);
      tooltipEl.style.top = `${adjustedCoords.y}px`;
      tooltipEl.style.left = `${adjustedCoords.x}px`;
    }
  }, [coords, position]);

  const positionClasses = {
    top: 'transform -translate-x-1/2 -translate-y-full -mt-2 ms-4',
    right: 'transform translate-x-full -translate-y-1/2 mt-4 ms-2',
    bottom: 'transform -translate-x-1/2 translate-y-full mt-6 ms-4',
    left: 'transform -translate-x-full -translate-y-1/2 mt-4 -ms-2',
  };
  const text = content;
  const minWidth = text.length >= 15 && position === ('top' || 'bottom') && 'min-w-20';
  return ReactDOM.createPortal(
    <div
      ref={tooltipRef}
      className={`absolute bg-gray-800 text-white text-sm py-1 px-2 rounded z-50 ${minWidth} max-w-xs ${positionClasses[position]}`}
      style={{ top: `${coords.y}px`, left: `${coords.x}px` }}
    >
      {content}
    </div>,
    document.body
  );
};

export default Tooltip;
