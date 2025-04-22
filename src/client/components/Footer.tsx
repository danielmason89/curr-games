import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>&copy; 2021 - {currentYear} curr/games</FooterText>
        <RepoLink
          href='https://github.com/danielmason89/curr-games'
          target='_blank'
          rel='noopener noreferrer'>
          View on GitHub
        </RepoLink>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  padding: 1.5rem 0;
  margin-top: 4rem;
  border-top: 1px solid #333;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: #fff;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  p {
    margin: 0;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
`;

const RepoLink = styled.a`
  color: var(--primary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;
