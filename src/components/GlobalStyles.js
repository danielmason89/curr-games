import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

html{
    &::-webkit-scrollbar{
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb{
        background-color: darkgrey;
    }
    &::-webkit-scrollbar-track {
    background: white; 
}
}

body {
    font-family: 'Open Sans', sans-serif;
    width: 100%;
}
h1 {
    font-size: 4rem;
    font-family: 'Abril Fatface', cursive;
    font-weight: lighter;
    color: #c25353;
}
h2 {
    font-size: 3rem;
    font-family: 'Abril Fatface', cursive;
    font-weight: lighter;
    color: #c25353;
}
h3{
    font-size: 1.3rem;
    color: #4e4444;
    padding: 1.5rem 0rem;
}
p{
    font-size: 1.2rem;
    line-height: 200%;
    color: #696969;
}
a{
    text-decoration: none;
    color: #4e4444;
}
img{
    display: block;
}

input {
    font-weight: bold;
    font-family: 'Open Sans', sans-serif;
}
`;

export default GlobalStyles;