import React, { FC } from 'react';
import { Nav } from 'components/Nav';

type Props = {};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="bg-gray-200 antialiased text-gray-900 pt-2  min-h-screen">
      <div className="w-screen md:w-11/12 m-auto">
        <Nav />
        {children}
      </div>
    </div>
  );
};
