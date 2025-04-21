import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';

export function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const query = searchParams.get('q') || '';
  const [textInput, setTextInput] = useState(query);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const submitSearch = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const trimmed = textInput.trim();
    if (trimmed) {
      navigate('/search?q=' + encodeURIComponent(textInput));
    }
  };

  const clearSearched = () => {
    setTextInput('');
    inputRef.current?.focus();
  };

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <Form className='search' onSubmit={submitSearch}>
      <InputGroup>
        <SearchInputWrapper>
          <SearchIcon onClick={handleIconClick} />
          <SearchInput
            value={textInput}
            onChange={inputHandler}
            type='text'
            ref={inputRef}
            placeholder='Search for games...'
            $hasText={!!textInput}
          />
          {textInput && <ClearIcon onClick={clearSearched} />}
        </SearchInputWrapper>
        <SearchButton type='submit'>Search</SearchButton>
      </InputGroup>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 0.75rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-light);
  font-size: 1rem;
  z-index: 1;
  pointer-events: none;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    left: 12px;
  }
`;

const ClearIcon = styled(FaTimes)`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-medium);
  font-size: 1rem;
  cursor: pointer;
  opacity: 0.7;
  z-index: 2;

  &:hover {
    opacity: 1;
    color: var(--primary);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    right: 12px;
  }
`;

interface SearchInputProps {
  $hasText: boolean;
}

const SearchInput = styled.input<SearchInputProps>`
  width: 100%;
  font-size: 1.1rem;
  padding: 0.8rem 1.2rem 0.8rem 2.6rem;
  padding-right: ${props => (props.$hasText ? '2.6rem' : '1.2rem')};
  border: none;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.15s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-light);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.7rem 1rem 0.7rem 2.2rem;
    padding-right: ${props => (props.$hasText ? '2.2rem' : '1rem')};
  }
`;

const SearchButton = styled.button`
  padding: 0 1.5rem;
  height: 48px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  box-shadow: var(--shadow-sm);
  background: linear-gradient(135deg, #c25353, #a71d31);
  color: white;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #d06868, #b92e42);
  }

  @media (max-width: 768px) {
    height: 44px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 40px;
  }
`;
