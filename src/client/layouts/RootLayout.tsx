import React from 'react';
import { Outlet, NavLink } from 'react-router';

export default function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/games'>Games</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
