import React from 'react';
import { Outlet, NavLink } from 'react-router';

interface NavLinkProps {
  isActive: boolean;
}

export default function RootLayout() {
  return (
    <div className='root-layout'>
      <header>
        <nav>
          <NavLink
            to='/'
            className={({ isActive }: NavLinkProps) =>
              isActive ? 'active' : ''
            }>
            Home
          </NavLink>
          <NavLink
            to='/games'
            className={({ isActive }: NavLinkProps) =>
              isActive ? 'active' : ''
            }>
            Games
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
