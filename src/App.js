import React, { Component } from "react";
import LetterBox from "./LetterBox";
import Word from "./Word";
import WordBox from "./WordBox";
import { findByLabelText } from "@testing-library/react";
import Keyboard from 'react-simple-keyboard'; 
import 'react-simple-keyboard/build/css/index.css'

export default function App() {
  return (
    <div className="app">
      <WordBox correctWord="QUIET" />
      {/* <Keyboard
        theme={"hg-theme-default myTheme1"} */}
      {/* /> */}
    </div>
  );
}
