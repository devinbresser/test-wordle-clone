import React, { Component } from "react";
import LetterBox from "./LetterBox";
import EnterButton from "./EnterButton";
import isValidWord from "./isValidWord";

export default class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lettersArray: ["", "", "", "", ""],
    };
    //  this.guess = this.guess.bind(this);
  }

  // determines whether the current input is a valid 5-letter word
  isValidWord(characters) {
    //end game if guess is correct
    // if(characters == this.props.correctWord){
    //   alert('Correct')
    //   return true;
    // }
    if (characters.length == 5) return true;
    return false;
  }

  //update letter array with new contents
  updateWord(letter, index) {
    let newArray = this.state.lettersArray.slice();
    newArray[index] = letter;
    this.setState({ lettersArray: newArray });
  }

  render() {
    return (
      <div>
        {/* {(this.state.wordState == "inactive" ||
          this.state.wordState == "inactive-past") && ( */}
        <div className="word-box">
          <LetterBox
            letterId={0}
            wordStates={this.state.wordStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          <LetterBox
            letterId={1}
            wordStates={this.state.wordStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          <LetterBox
            letterId={2}
            wordStates={this.state.wordStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          <LetterBox
            letterId={3}
            wordStates={this.state.wordStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          <LetterBox
            letterId={4}
            wordStates={this.state.wordStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          {
            <EnterButton
              wordId={this.props.wordId}
              guess={(id) => this.props.guess(id)}
              currentWordIndex={this.props.currentWordIndex}
              lettersArray={this.state.lettersArray.join("")}
              //isValidWord={() => this.props.isValidWord} why didn't this work?
              nextWord={() => this.props.nextWord()}
            />
          }
          <p>{this.props.wordId} {this.props.wordStates[this.props.wordId]}</p>
        </div>
        {/* )} */}
      </div>
    );
  }
}
