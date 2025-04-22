import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'Geist';
    src: url('/fonts/Geist-Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Geist';
    src: url('/fonts/Geist-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Geist';
    src: url('/fonts/Geist-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Geist';
    src: url('/fonts/Geist-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Geist';
    src: url('/fonts/Geist-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}

:root {
    --primary: #c25353;
    --primary-dark: #a71d31;
    --primary-light: #e07777;
    --text-dark: #333333;
    --text-medium: #555555;
    --text-light: #777777;
    --bg-light: #ffffff;
    --bg-off: #f9f9f9;
    --border-color: rgba(194, 83, 83, 0.1);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --transition: all 0.2s ease;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html{
    &::-webkit-scrollbar{
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb{
        background-color: var(--primary-light);
        border-radius: 6px;
    }
    &::-webkit-scrollbar-track {
        background: var(--bg-off);
    }
}

body {
    font-family: 'Geist', sans-serif;
    width: 100%;
    background-color: var(--bg-light);
    color: var(--text-medium);
    line-height: 1.5;
    font-weight: 400;
}

h1 {
    font-size: 3rem;
    font-family: 'Geist', sans-serif;
    font-weight: 700;
    color: var(--primary);
    letter-spacing: -0.5px;
    margin-bottom: 0.5rem;
}

h2 {
    font-size: 2rem;
    font-family: 'Geist', sans-serif;
    font-weight: 600;
    color: var(--primary);
    letter-spacing: -0.3px;
    margin-bottom: 0.5rem;
}

h3 {
    font-size: 1.3rem;
    color: var(--text-dark);
    font-weight: 500;
    margin: 0.75rem 0;
}

p {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--text-medium);
    margin-bottom: 1rem;
}

a {
    text-decoration: none;
    color: var(--primary);
    transition: var(--transition);
    
    &:hover {
        color: var(--primary-dark);
    }
}

img {
    display: block;
    max-width: 100%;
    height: auto;
}

input, button {
    font-family: 'Geist', sans-serif;
}

button {
    cursor: pointer;
}

/* Responsive typography */
@media (max-width: 768px) {
    h1 {
        font-size: 2.25rem;
    }
    
    h2 {
        font-size: 1.5rem;
    }
    
    h3 {
        font-size: 1.125rem;
    }
    
    p {
        font-size: 1rem;
    }
}
`;

export default GlobalStyles;
