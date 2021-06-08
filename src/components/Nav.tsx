import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

type Props = {};

const items = [
  {
    name: 'HOME',
    link: '/',
  },
  {
    name: 'ABOUT',
    link: '/about',
  },
];
export const Nav: FC<Props> = (props) => {
  return (
    <div className="mx-0 md:mx-14 my-0 mb-5 md:my-7 rounded-none md:rounded-xl bg-white h-20 w-auto shadow-sm">
      <NavLink to="/">
        <img
          src="/logo.png"
          className="h-12 mt-3 ml-0 md:ml-5 float-left"
          alt="logo"
        />{' '}
      </NavLink>
      <ul className="float-right h-full inline-flex ml-0 md:ml-12">
        {items.map((item) => (
          <NavLink
            exact
            to={item.link}
            activeClassName="text-yellow-500"
            key={uuidv4()}
            className=" text-lg font-bold h-full mr-10"
            style={{ lineHeight: '5rem' }}
          >
            {item.name}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
