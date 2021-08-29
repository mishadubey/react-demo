import React from 'react';

const Wrapper: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col py-6 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Wrapper;
