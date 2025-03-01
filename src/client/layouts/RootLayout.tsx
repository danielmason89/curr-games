import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../components/Nav';

export default function RootLayout() {
  return (
    <>
      <header>
        <Nav/>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
