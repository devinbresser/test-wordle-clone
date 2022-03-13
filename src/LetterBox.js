import React, { Component } from "react";

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const goodWords = require("./dictionary.json");

export default class LetterBox extends Component {
  constructor(props) {
    super(props);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    if (
      this.props.wordStates[this.props.wordId] == "active" &&
      this.props.letterId == 0
    ) {
      this.myInput.focus();
    }
    if (this.props.wordStates[this.props.wordId] == "active") {
      this.myInput.value =
        this.props.lettersArray[this.props.wordId][this.props.letterId];
    }
  }

  handleBackspace = (e) => {
    this.props.updateWord("", this.props.wordId, this.props.letterId, false);
    if (e.keyCode === 9) e.preventDefault();
    if (e.keyCode != 8) return;

    // first letter - do not jump back
    if (this.props.letterId == 0) {
      this.props.updateWord("", this.props.wordId, this.props.letterId, false);
      return;
    }

    // last letter TODO:fix hardcode for scalability
    if (this.props.letterId == 4) {
      this.props.focusBackward(this.props.wordId, this.props.letterId);
    }

    // middle letters: erase, then jump back
    this.props.updateWord("", this.props.wordId, this.props.letterId, false);
    this.props.focusBackward(this.props.wordId, this.props.letterId);
    return;
  };

  handleChangeState = (e) => {
    if (!alphabet.includes(e.target.value.toUpperCase())) return;
    this.props.updateWord(
      e.target.value.toUpperCase(),
      this.props.wordId,
      this.props.letterId,
      true
    );
  };
  render() {
    let className = `letter-box ${this.props.wordStates[this.props.wordId]}`;

    //for inactive-previous word, also assign correct-right-place and correct-wrong-place based on guess
    if (this.props.wordStates[this.props.wordId] == "inactive-previous") {
      className = `letter-box ${
        this.props.wordStates[this.props.wordId]
      } ${this.props.assignLetterClass(
        this.props.letterId,
        this.props.wordId
      )}`;
    }
    return (
      <div>
        <input
          autoComplete="off"
          tabIndex={-1}
          value={
            this.props.lettersArray[this.props.wordId][this.props.letterId]
          }
          ref={(ip) => (this.myInput = ip)}
          id={this.props.letterId}
          className={className}
          onKeyDown={this.handleBackspace}
          onChange={this.handleChangeState}
          maxLength="1"
        />
      </div>
    );
  }
}
