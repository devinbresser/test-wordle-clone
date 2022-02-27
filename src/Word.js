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
  }

  // determines whether the current input is a valid 5-letter word
  isValidWord(characters) {
    //end game if guess is correct
    // if(characters == this.props.correctWord){
    //   alert('Correct')
    //   return true;
    // }
    if (characters.length == this.props.correctWord.length) return true;
    return false;
  }

  //update letter array with new contents
  updateWord(letter, index) {
    let newArray = [...this.state.lettersArray];
    newArray[index] = letter;
    this.setState({ lettersArray: newArray });
  }

  //helper method: containsExactMatch. returns True if an input string contains an exact match with the correct word
  containsExactMatch(string, letter) {
    //"EACT"
    const correctWordSlice = this.props.correctWord.slice(this.props.correctWord.length-string.length);
    // console.log('correctWordSlice: ', correctWordSlice)
    // console.log('guessSlice: ', string)
    //"REAT"
    for (let a = 0; a < correctWordSlice.length; a++) {
      if (correctWordSlice[a]==letter && correctWordSlice[a] == string[a]){
        //console.log("Exact match found: " + correctWordSlice[a]);
        return true;
      } 
    }
    return false;
  }

  //assign letterStates based on guess
  assignLetterClass(index) {
    let correctWord = this.props.correctWord;
    let guessWord = this.state.lettersArray;
    let guessLetter = this.state.lettersArray[index];

    if (correctWord[index] == guessLetter) {
      return "correct-right-place";
    }
    //letter is not in correct place, but exists in correct word, and we did not already guess that letter: return correct-wrong-place
    if (
      ( correctWord.includes(guessLetter) ) &&
      ( !guessWord.slice(0, index).includes(guessLetter) ) &&
      ( !this.containsExactMatch(guessWord.join("").toString().slice(index, guessWord.length), guessLetter) )
    ) {
      return "correct-wrong-place";
    }
    return "unknown";
  }

  render() {
    let wordClass = `word-box ${this.props.wordStates[this.props.wordId]}`;
    return (
      <div>
        {/* {(this.state.wordState == "inactive" ||
          this.state.wordState == "inactive-past") && ( */}
        <div className={wordClass}>
          <LetterBox
            letterId={0}
            virtualKeyboardChange={(input)=>{this.props.virtualKeyboardChange(input)}}
            assignLetterClass={(index) => this.assignLetterClass(index)}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            letterStates={this.state.letterStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          <LetterBox
            letterId={1}
            assignLetterClass={(index) => this.assignLetterClass(index)}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            letterStates={this.state.letterStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          <LetterBox
            letterId={2}
            assignLetterClass={(index) => this.assignLetterClass(index)}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            letterStates={this.state.letterStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          <LetterBox
            letterId={3}
            assignLetterClass={(index) => this.assignLetterClass(index)}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            letterStates={this.state.letterStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          <LetterBox
            letterId={4}
            assignLetterClass={(index) => this.assignLetterClass(index)}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            letterStates={this.state.letterStates}
            updateWord={(letter, index) => this.updateWord(letter, index)}
          />
          { this.props.wordStates[this.props.wordId] == "active" &&
            <EnterButton
              wordId={this.props.wordId}
              wordStates={this.props.wordStates}
              makeGuess={(letters, id) => this.props.makeGuess(letters, id)}
              lettersArray={this.state.lettersArray.join("")}
              nextWord={() => this.props.nextWord()}
            />
          }
        </div>
        {/* )} */}
      </div>
    );
  }
}
