import React, { Component } from "react";
import LetterBox from "./LetterBox";
import EnterButton from "./EnterButton";
import isValidWord from "./isValidWord";

export default class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      lettersArray: ["", "", "", "", ""]
    };
    //  this.toggleVis = this.toggleVis.bind(this);
  }

  // // determines whether the current input is a valid 5-letter word
  // isValidWord(characters) {
  //   if (characters.length == 5) return true;
  //   return false;
  // };

  toggleVis() {
     if (isValidWord(this.state.lettersArray.join(""))) {
      this.setState({ isActive: false });
     }
  }

  updateWord(letter, index) {
    const newArray = this.state.lettersArray.slice();
    newArray[index] = letter;
    this.setState({ lettersArray: newArray });
  }

  render() {
    return (
      <div>
        {this.state.isActive && (
          <div className="word-box">
            <LetterBox
              letterIndex={0}
              updateWord={(letter, index) => this.updateWord(letter, index)}
            />
            <LetterBox
              letterIndex={1}
              updateWord={(letter, index) => this.updateWord(letter, index)}
            />
            <LetterBox
              letterIndex={2}
              updateWord={(letter, index) => this.updateWord(letter, index)}
            />
            <LetterBox
              letterIndex={3}
              updateWord={(letter, index) => this.updateWord(letter, index)}
            />
            <LetterBox
              letterIndex={4}
              updateWord={(letter, index) => this.updateWord(letter, index)}
            />
            {
              <EnterButton
                someText={this.state.lettersArray.join("")}
                toggle={() => this.toggleVis()}
              />
            }
          </div>
        )}
      </div>
    );
  }
}
