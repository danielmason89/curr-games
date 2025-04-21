import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';

export function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const initialQuery = searchParams.get('q') || '';
  const [textInput, setTextInput] = useState(initialQuery);

  // Effect to update the input field when the URL search params change
  // This ensures the input clears when navigating away from a search results page
  useEffect(() => {
    const currentQuery = searchParams.get('q')?.trim() || '';
    setTextInput(currentQuery);
  }, [searchParams]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const submitSearch = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (textInput && textInput.trim()) {
      navigate('/games?q=' + encodeURIComponent(textInput.trim()));
    }
  };

  // Clears the local input state and focuses the input
  const clearSearched = () => {
    setTextInput('');
    inputRef.current?.focus();
  };

  // Focuses the input when the search icon is clicked
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
          {/* Show clear icon only if there is text */}
          {textInput && <ClearIcon onClick={clearSearched} />}
        </SearchInputWrapper>
        <SearchButton type='submit'>Search</SearchButton>
      </InputGroup>
    </Form>
  );
}

// Keep original styled components
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
  color: var(--primary-light); // Keep original color
  font-size: 1rem;
  z-index: 1;
  pointer-events: none; // Keep original pointer-events

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
  color: var(--text-medium); // Keep original color
  font-size: 1rem;
  cursor: pointer;
  opacity: 0.7; // Keep original opacity
  z-index: 2;

  &:hover {
    opacity: 1;
    color: var(--primary); // Keep original hover color
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
  padding: 0.8rem 1.2rem 0.8rem 2.6rem; // Keep original padding base
  // Keep original dynamic padding-right logic
  padding-right: ${props => (props.$hasText ? '2.6rem' : '1.2rem')};
  border: none;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); // Keep original shadow
  transition: box-shadow 0.15s ease; // Keep original transition

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-light); // Keep original focus shadow
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.7rem 1rem 0.7rem 2.2rem; // Keep original responsive padding base
    // Keep original responsive dynamic padding-right
    padding-right: ${props => (props.$hasText ? '2.2rem' : '1rem')};
  }
`;

const SearchButton = styled.button`
  padding: 0 1.5rem;
  height: 48px; // Keep original height
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.15s ease; // Keep original transition
  box-shadow: var(--shadow-sm); // Keep original shadow
  background: linear-gradient(
    135deg,
    #c25353,
    #a71d31
  ); // Keep original background
  color: white;
  white-space: nowrap;

  &:hover {
    // Keep original hover background
    background: linear-gradient(135deg, #d06868, #b92e42);
  }

  @media (max-width: 768px) {
    height: 44px; // Keep original responsive height
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 40px; // Keep original responsive height
  }
`;
