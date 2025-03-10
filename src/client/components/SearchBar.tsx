import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import styled from 'styled-components';

export function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const query = searchParams.get('q') || '';
  const [textInput, setTextInput] = useState(query);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const submitSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  return (
    <Form className='search'>
      <input
        value={textInput}
        onChange={inputHandler}
        type='text'
        ref={inputRef}
      />
      <div className='buttons'>
        <button onClick={submitSearch} type='submit' id='button1'>
          Search
        </button>
        <button onClick={clearSearched} type='button' id='button2'>
          Clear
        </button>
      </div>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 2rem;

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: row nowrap;
    margin: 1rem 0;
  }

  #button1,
  #button2 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    margin: 0 2rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    background: #c25353;
    color: white;
    border-radius: 1rem;
    margin-top: 1rem;
    &:hover {
      background-color: #c77272;
      color: #362323;
    }
    @media (max-width: 768px) {
      width: 50%;
      font-size: 0.9rem;
    }
  }
`;
