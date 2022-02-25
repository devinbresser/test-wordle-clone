import React, { Component } from "react";
import LetterBox from "./LetterBox";
import EnterButton from "./EnterButton";
import isValidWord from "./isValidWord";

export default class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lettersArray: ["", "", "", "", ""],
      letterStates: ["unknown","unknown","unknown","unknown","unknown"]
    };
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
    let wordClass = `${this.props.wordStates[this.props.wordId]}-word-box`;
    return (
      <div>
        {/* {(this.state.wordState == "inactive" ||
          this.state.wordState == "inactive-past") && ( */}
        <div className={wordClass}>
          <LetterBox
            letterId={0}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            letterStates={this.state.letterStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          <LetterBox
            letterId={1}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            letterStates={this.state.letterStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          <LetterBox
            letterId={2}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            letterStates={this.state.letterStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          <LetterBox
            letterId={3}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            letterStates={this.state.letterStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          <LetterBox
            letterId={4}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            letterStates={this.state.letterStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          {
            <EnterButton
              wordId={this.props.wordId}
              wordStates={this.props.wordStates}
              makeGuess={(letters, id) => this.props.makeGuess(letters, id)}
              lettersArray={this.state.lettersArray.join("")}
              nextWord={() => this.props.nextWord()}
            />
          }
          <p>
            {this.props.wordId} {this.props.wordStates[this.props.wordId]}
          </p>
        </div>
        {/* )} */}
      </div>
    );
  }
}
