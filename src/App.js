import React from "react";
// Components and Pages
import Home from "./pages/Home";
import Nav from "./components/Nav";
// Styles and Animation
import GlobalStyles from "./components/GlobalStyles";
// Router
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
