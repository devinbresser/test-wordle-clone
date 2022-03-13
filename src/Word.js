import React, { Component } from "react";
import LetterBox from "./LetterBox";

export default class Word extends Component {
  render() {
    let wordClass = `word-box ${this.props.wordStates[this.props.wordId]}`;
    return (
      <div>
        {/* {(this.state.wordState == "inactive" ||
          this.state.wordState == "inactive-past") && ( */}
        <div className={wordClass}>
          {[...Array(this.props.correctWord.length)].map((a, idx) => (
            <LetterBox
              key={idx}
              ref={(ch) => (this[`letter${idx}`] = ch)}
              lettersArray={this.props.lettersArray}
              letterId={idx}
              focusBackward={(word, index) =>
                this.props.focusBackward(word, index)
              }
              assignLetterClass={(index, word) =>
                this.props.assignLetterClass(index, word)
              }
              wordId={this.props.wordId}
              wordStates={this.props.wordStates}
              updateWord={(letter, word, index, focus) =>
                this.props.updateWord(letter, word, index, focus)
              }
            />
          ))}
        </div>
      </div>
    );
  }
}
