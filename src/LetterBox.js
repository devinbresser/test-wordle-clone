import React, { Component } from "react";

export default class LetterBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeLetter = this.props.changeLetter;
  }
  handleChange(event) {
    this.props.updateWord(
      event.target.value.toUpperCase(),
      this.props.letterId
    );
  }
  render() {
    let className = `${this.props.wordStates[this.props.wordId]}-letter-box`;
    //override this rule for previous guesses
    if(this.props.wordStates[this.props.wordId]=="inactive-previous"){
      className = `inactive-previous-letter-box ${this.props.letterStates[this.props.letterId]}`
      console.log(`inactive-previous-letter-box ${this.props.letterStates[this.props.letterId]}`)
    }
    return (
      <input className="inactive-previous-letter-box unknown" onChange={this.handleChange} maxLength="1" />
    );
  }
}
