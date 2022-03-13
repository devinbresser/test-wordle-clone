import React, { useState } from "react";
const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

export default function Keyboard(props) {
  const [keyColors, setKeyColors] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
    F: "",
    G: "",
    H: "",
    I: "",
    J: "",
    K: "",
    L: "",
    M: "",
    N: "",
    O: "",
    P: "",
    Q: "",
    R: "",
    S: "",
    T: "",
    U: "",
    V: "",
    W: "",
    X: "",
    Y: "",
    Z: "",
  });

  const handleChangeState = (e) => {
    props.updateWord(
      e.target.innerHTML,
      props.currentWordIndex,
      parseInt(document.activeElement.id),
      true
    );
  };

  const assignKeyClass = (arr, word) => {
    let results = arr.map((i, index) => props.assignLetterClass(index, word));
    console.table(arr);
    console.table(results);
    //update the state
    let newArray = keyColors;
    //insert new letter states into the object
    for (let a = 0; a < arr.length; a++) {
      //if existing state is green, do not overwrite
      if (newArray[`${arr[a]}`] == "correct-right-place") continue;
      //if existing state is yellow AND new input is gray, do not overwrite
      if (
        newArray[`${arr[a]}`] == "correct-wrong-place" &&
        results[a] == "unknown"
      )
        continue;

      newArray[`${arr[a]}`] = results[a];
    }
    setKeyColors(newArray);
    return;
  };

  return (
    <div className="keyboard">
      <div className="row">
        {row1.map((a) => (
          <button
            tabIndex={-1}
            className={`key ${keyColors[`${a}`]}`}
            key={a}
            onMouseDown={(e) => {
              e.preventDefault();
              handleChangeState(e);
            }}
          >
            {a}
          </button>
        ))}

        <div>
          <button
            className="backspace-button"
            tabIndex={-1}
            onClick={() => {
              console.log(keyColors.S);
              //only work if is the active word
              if (
                props.wordStates[props.currentWordIndex] == "active" &&
                !props.lettersArray[props.currentWordIndex].includes("")
              ) {
                // console.log(
                //   props.lettersArray[props.currentWordIndex],
                //   props.currentWordIndex
                // );
                assignKeyClass(
                  props.lettersArray[props.currentWordIndex],
                  props.currentWordIndex
                );
                props.makeGuess(props.currentWordIndex);
              }
            }}
          >
            BKSP
          </button>
        </div>
      </div>
      <div className="row">
        {row2.map((a) => (
          <button
            tabIndex={-1}
            key={a}
            className={`key ${keyColors[`${a}`]}`}
            onMouseDown={(e) => {
              e.preventDefault();
              handleChangeState(e);
            }}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="row">
        {row3.map((a) => (
          <button
            tabIndex={-1}
            key={a}
            className={`key ${keyColors[`${a}`]}`}
            onMouseDown={(e) => {
              e.preventDefault();
              handleChangeState(e);
            }}
          >
            {a}
          </button>
        ))}

        <div>
          <button
            className="enter-button"
            tabIndex={-1}
            onClick={() => {
              console.log(keyColors.S);
              //only work if is the active word
              if (
                props.wordStates[props.currentWordIndex] == "active" &&
                !props.lettersArray[props.currentWordIndex].includes("")
              ) {
                // console.log(
                //   props.lettersArray[props.currentWordIndex],
                //   props.currentWordIndex
                // );
                assignKeyClass(
                  props.lettersArray[props.currentWordIndex],
                  props.currentWordIndex
                );
                props.makeGuess(props.currentWordIndex);
              }
            }}
          >
            GO
          </button>
        </div>
      </div>
    </div>
  );
}
