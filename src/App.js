import React, {Component} from "react";
import LetterBox from "./LetterBox";
import Word from "./Word";
import WordBox from "./WordBox"
import { findByLabelText } from "@testing-library/react";

export default function App() {
  
  return (
      <WordBox correctWord = "WATER" />

  );
}
