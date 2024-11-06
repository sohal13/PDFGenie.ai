// Layout.jsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full p-4 bg-gray-100">
      {children}
    </div>
  );
};

export default Layout;