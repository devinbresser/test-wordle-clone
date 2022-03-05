import React, { useState } from "react";

export default function EnterButton(props) {
  return (
    <div>
      <button
        className="enter-button"
        onClick={() => {
          //only work if is the active word
          if (
            props.wordStates[props.wordId] == "active" &&
            props.lettersArray.length == 5
          ) {
            props.makeGuess(props.lettersArray, props.wordId);
            // props.nextWord();
          }
        }}
      >
        GO
      </button>
    </div>
  );
}
