import React, { Component } from "react";
import WordBox from "./WordBox";
import Header from "./Header"
import { findByLabelText } from "@testing-library/react";
import Keyboard from 'react-simple-keyboard'; 
import 'react-simple-keyboard/build/css/index.css'

export default function App() {
  return (
    <div className="app">
      <Header />
      <WordBox correctWord="QUOTE" />
      {/* <Keyboard
        theme={"hg-theme-default myTheme1"} */}
      {/* /> */}
    </div>
  );
}
