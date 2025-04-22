import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

export default function RootLayout() {
  return (
    <Layout>
      <header>
        <Nav />
      </header>

      <MainContent>
        <Outlet />
      </MainContent>

      <footer>
        <Footer />
      </footer>
    </Layout>
  );
}
