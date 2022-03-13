import React, {useState} from "react";
const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "BKSP"];
const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

export default function Keyboard(props) {

  const [keyColors, setKeyColors] = useState({
    "A":"unknown",
    "B":"unknown",
    "C":"unknown",
    "D":"unknown",
    "E":"unknown",
    "F":"unknown",
    "G":"unknown",
    "H":"unknown",
    "I":"unknown",
    "J":"unknown",
    "K":"unknown",
    "L":"unknown",
    "M":"unknown",
    "N":"unknown",
    "O":"unknown",
    "P":"unknown",
    "Q":"unknown",
    "R":"unknown",
    "S":"unknown",
    "T":"unknown",
    "U":"unknown",
    "V":"unknown",
    "W":"unknown",
    "X":"unknown",
    "Y":"unknown",
    "Z":"unknown"
  })

  const handleChangeState = (e) => {
    props.updateWord(
      e.target.innerHTML,
      props.currentWordIndex,
      parseInt(document.activeElement.id),
      true
    );
  };

  // const dictLookup = (letter) =>{
  //    for(let a=0; a<dict.length; a++){
  //      if(dict[a].key==letter){
  //        console.log("Found it! " + letter)
  //        return dict[a].value;
  //      }
  //    }
  // }

  const assignKeyClass = (arr, word) => {
    let results = arr.map((i, index) => props.assignLetterClass(index, word));
    //update the state
    let newArray = keyColors;
    //insert new letter states into the object
    for(let a=0; a<arr.length; a++){
      //do not overwrite green letters
      //TODO: do not overwrite yellow letters with grey (but ok with green)
      if(newArray[`${arr[a]}`] == 'correct-right-place') continue;
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
              // updateWord(letter, word, index, focus)
              handleChangeState(e);
            }}
          >
            {a}
          </button>
        ))}
      </div>
      <div className="row">
        {row2.map((a) => (
          <button
            tabIndex={-1}
            key={a}
            className={`key ${keyColors[`${a}`]}`}
            onMouseDown={(e) => {
              e.preventDefault();
              // updateWord(letter, word, index, focus)
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
            //${dictLookup(a)}
            onMouseDown={(e) => {
              e.preventDefault();
              // updateWord(letter, word, index, focus)
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
              console.log(keyColors.S)
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
                // props.nextWord();
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
