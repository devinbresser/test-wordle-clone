import React from "react";
import LetterBox from "./LetterBox";
import Word from "./Word";

export default function App() {
  
  return (
    <div className="words-sequence">
      <Word id="first-guess" />
      <Word id="second-guess" />
      <Word id="third-guess" />
      <Word id="fourth-guess" />
      <Word id="fifth-guess" />
      <Word id="sixth-guess" />
    </div>
  );
}
