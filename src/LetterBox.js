import React, { Component } from "react";

export default class LetterBox extends Component {
  constructor(props) {
    super(props);
    this.state = { letter: this.props.initialCharacter };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.setState({letter: event.target.value})
  }
  render() {
    return (
        <input
          className="letter-box"
          value={this.state.letter}
          onChange={this.handleChange}
          maxLength="1"
        />
    );
  }
}
