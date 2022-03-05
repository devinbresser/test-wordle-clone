import React, { Component } from "react";

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const goodWords = require('./dictionary.json')


export default class LetterBox extends Component {
  constructor(props) {
    super(props);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.changeLetter = this.props.changeLetter;
    this.inputRef = React.createRef();
    this.state = {
      value: "",
    };
  }

  handleBackspace = (e) => {
    if (e.keyCode == 8 && this.props.letterId == 0) {
      this.setState({ value: "" });
      return;
    } else if (e.keyCode == 8) {
      console.log("about to backspace with this index: " + this.props.letterId);
      this.setState({ value: "" });
      this.props.focusBackward(this.props.letterId);
      return;
    }
  };

  handleChangeState = (e) => {
    if (alphabet.includes(e.target.value.toUpperCase())) {
      console.log(goodWords)
      this.setState({ value: e.target.value });
      this.props.updateWord(
        e.target.value.toUpperCase(),
        this.props.letterId,
        true
      );
    }

    //PRESS TAB
  };
  //processing to assign css classes to letter boxes
  //for active and inactive-future words, assign css class

  render() {
    let className = `letter-box ${this.props.wordStates[this.props.wordId]}`;

    //for inactive-previous word, also assign correct-right-place and correct-wrong-place based on guess
    if (this.props.wordStates[this.props.wordId] == "inactive-previous") {
      className = `letter-box ${
        this.props.wordStates[this.props.wordId]
      } ${this.props.assignLetterClass(this.props.letterId)}`;
    }
    return (
      <div>
        <input
          ref={(ip) => (this.myInput = ip)}
          // onFocus={() => this.props.focusThis(this.props.letterId, true)}
          // onBlur={() => this.props.focusThis(this.props.letterId, false)}
          className={className}
          value={this.state.value}
          onKeyDown={this.handleBackspace}
          onChange={this.handleChangeState}
          //onKeyUp={this.handleChange}
          maxLength="1"
        />
      </div>
    );
  }
}

//onFocus = {()=>this.props.updateLetterState(this.props.letterId, true)} onBlur = {()=>this.props.updateLetterState(this.props.letterId, false)}
//{()=>this.props.focusThis(this.props.letterId, true)} onBlur = {()=>this.props.focusThis(this.props.letterId, false)}
