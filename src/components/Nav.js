import React, {useState} from 'react'
// Styling and Animation
import styled from 'styled-components';
import {motion} from 'framer-motion';
import logo from '../img/logo.svg';
import {fadeIn} from '../animations';  
// Redux and Routes
import {fetchSearch} from '../actions/gamesAction'
import {useDispatch} from 'react-redux';

const Nav = () => {
    const dispatch = useDispatch();
    const [textInput, setTextInput] = useState('');

    const inputHandler = (e) => {
        setTextInput(e.target.value);
    };

    const submitSearch = (e) => {
        e.preventDefault();
        dispatch(fetchSearch(textInput));
        setTextInput('');
    }

    const clearSearched = () => {
        dispatch({type: 'CLEAR_SEARCHED'});
    };
    return (
        <StyledNav variants={fadeIn} initial='hidden' animate='show'>
        <Logo onClick={clearSearched}>
        <h1>Curr</h1>
        <img src={logo} alt='logo' />
        <h1>Games</h1>
        </Logo>
        <h2>your platform to find the most curr games.</h2>
        <form className="search">
            <input value={textInput} onChange={inputHandler} type="text"/>
            <button onClick={submitSearch} type="submit">Search</button>
        </form>
        </StyledNav>
    )
}

const StyledNav = styled(motion.nav)`
    padding: 3rem 4rem;
    text-align: center;
    input {
        width: 30%;
        font-size: 1.5rem;
        padding: .5rem;
        border: none;
        margin-top: 1rem;
        box-shadow: 0px 0px 30px rgba(0,0,0,0.2);
    }

    button {
        font-size: 1.5rem;
        border: none;
        padding: 0.5rem 2rem;
        margin-left: 2rem;
        margin-bottom: .5rem;
        cursor: pointer;
        background: #c25353;
        color: white;
        border-radius: 1rem;
    }
`;

const Logo = styled(motion.div)`
text-align:center;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 1rem;
cursor: pointer;
img {
    height: 2rem;
    width: 2rem;
}
h1 {
    margin: .5rem 1rem;
}
h2 {
    padding: 3rem 0rem;
}
`;
export default Nav
