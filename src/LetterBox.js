import React, { Component } from "react";

export default class LetterBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeLetter = this.props.changeLetter;
  }
  handleChange(event) {
     this.props.updateWord(event.target.value.toUpperCase(), this.props.letterId);
  }
  render() {
    return (
      <input
        className="letter-box"
        onChange={this.handleChange}
        maxLength="1"
      />
    );
  }
}
