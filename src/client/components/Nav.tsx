import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../assets/logo.svg';
import { fadeIn } from '../animations';
import { NavLink } from 'react-router';
import {SearchBar} from './SearchBar';

const MotionNavLink = motion.create(NavLink);

const Nav = () => {
  return (
    <StyledNav
      variants={fadeIn}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Logo
        to='/'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5 }}>
        <h1>Curr</h1>
        <img src={logo} alt='logo' />
        <h1>Games</h1>
      </Logo>
      <h2>your platform to find the most curr games.</h2>
      <SearchBar />
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
  padding: 3rem 4rem;
  text-align: center;
  h1 {
    text-align: center;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 2rem;
    }
  }
  h2 {
    text-align: center;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 1rem;
    }
  }
  input {
    width: 35%;
    font-size: 1rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    @media (max-width: 768px) {
      width: 100%;
      font-size: 0.75rem;
      border: none;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    }
  }

  
`;

const Logo = styled(MotionNavLink)`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  img {
    height: 2rem;
    width: 2rem;
  }
  h1 {
    margin: 0.5rem 1rem;
  }
  h2 {
    padding: 3rem 0rem;
  }
`;
export default Nav;