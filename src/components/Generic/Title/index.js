import React from 'react';

const Title = ({ children, text, className }) => {
  return (
    <div className='p-4'>
      <h2 className={`text-lg font-semibold ${className}`}>{children || text}</h2>
    </div>
  );
};

export default Title;
