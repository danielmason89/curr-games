import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '@/client/assets/logo.svg';
import { fadeIn } from '@/client/utils/animations';
import { NavLink } from 'react-router';
import { SearchBar } from './SearchBar';

const MotionNavLink = motion.create(NavLink);

const Nav = () => {
  return (
    <StyledNav
      variants={fadeIn}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}>
      <Logo
        to='/'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5 }}>
        <h1>Curr</h1>
        <LogoImage src={logo} alt='logo' />
        <h1>Games</h1>
      </Logo>
      <Tagline>
        Your platform to find the most current video game releases.
      </Tagline>
      <SearchBar />
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
  padding: 2rem 4rem 3rem;
  text-align: center;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  border-bottom: 1px solid rgba(220, 100, 100, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 2rem;
  }
`;

const Tagline = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin: 1rem 0 1.5rem;
  color: rgba(194, 83, 83, 0.95);

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0.75rem 0 1.25rem;
  }
`;

const Logo = styled(MotionNavLink)`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  h1 {
    margin: 0 0.75rem;
    font-size: 2.5rem;
    font-weight: 600;
    background: linear-gradient(135deg, #bc4749 30%, #a71d31 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;

    @media (max-width: 768px) {
      font-size: 1.75rem;
      margin: 0 0.5rem;
    }
  }
`;

const LogoImage = styled.img`
  height: 2.25rem;
  width: 2.25rem;
  filter: drop-shadow(0 0 8px rgba(167, 29, 49, 0.3));

  @media (max-width: 768px) {
    height: 1.75rem;
    width: 1.75rem;
  }
`;

export default Nav;
