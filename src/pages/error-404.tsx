import React from 'react';
import Layout from '../layouts';

const ErrorNotFound: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col flex-1 items-center justify-center p-16">
        <div className="max-w-512 text-center">
          <h1 className="text-5xl font-medium text-gray-800 mb-4">404</h1>
          <h5 className="mb-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Sorry but we could not find the page you are looking for.</h5>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorNotFound;
