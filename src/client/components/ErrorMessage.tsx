import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { FaExclamationTriangle, FaSearch } from 'react-icons/fa';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 1rem;
    padding: 1rem;
    color: #e63946;
  }

  p {
    margin: 1rem 0;
    color: #555;
  }

  .error-details {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 5px;
    font-family: monospace;
    font-size: 0.9rem;
    color: #6c757d;
    max-width: 100%;
    overflow-x: auto;
  }

  svg {
    color: #e63946;
    font-size: 3rem;
  }
`;

interface ErrorMessageProps {
  title: string;
  message: string;
  icon?: 'error' | 'search';
  children?: ReactNode;
}

const ErrorMessage = ({
  title,
  message,
  icon = 'error',
  children,
}: ErrorMessageProps) => {
  return (
    <ErrorContainer>
      {icon === 'error' ? <FaExclamationTriangle /> : <FaSearch />}
      <h2>{title}</h2>
      <p>{message}</p>
      {children}
    </ErrorContainer>
  );
};

export default ErrorMessage;
