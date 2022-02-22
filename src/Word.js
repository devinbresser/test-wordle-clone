import React from "react";
import LetterBox from "./LetterBox";

export default function Word() {
  return (
    <div className="word-box">
      <LetterBox initialCharacter="C"/>
      <LetterBox initialCharacter="G"/>
      <LetterBox initialCharacter="G"/>
      <LetterBox initialCharacter="A"/>
      <LetterBox initialCharacter="Y"/>
    </div>
  );
}
