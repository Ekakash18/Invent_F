import React from 'react';

const Container = ({ children }) => {
  return (
    <div className={'bg-white rounded-xl min-h-[680px] shadow-md'}>
        {children}
    </div>
  );
};

export default Container;