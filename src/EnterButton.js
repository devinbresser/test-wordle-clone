import React, { Component } from "react";

export default class EnterButton extends Component {
  render() {
    return (
      <div>
        <button
          className="enter-button"
          onClick={() => {
            //only work if this is the active word
            if (
              this.props.wordStates[this.props.wordId] == "active" &&
              this.props.lettersArray.length == 5
            ) {
              this.props.makeGuess(this.props.lettersArray, this.props.wordId);
              // this.props.nextWord();
            }
          }}
        >
          GO
        </button>
      </div>
    );
  }
}
