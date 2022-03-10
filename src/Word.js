import React, { Component } from "react";
import LetterBox from "./LetterBox";
import EnterButton from "./EnterButton";

export default class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lettersArray: new Array(this.props.correctWord.length).fill(""),
    };


  }

  focusForward(index) {
    this[`letter${index+1}`].myInput.focus();
  }

  focusBackward(index) {
    this[`letter${index-1}`].myInput.focus();
  }

  //letter update methods
  //update letter array with new contents
  updateWord(letter, index, focus) {
    let newArray = [...this.state.lettersArray];
    newArray[index] = letter;
    this.setState({ lettersArray: newArray });
    console.log("new lettersarray: " + newArray);
    if(focus && index < this.props.correctWord.length-1){
      this.focusForward(index);
    }

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

  //helper method: containsExactMatch. returns True if an input string contains an exact match with the correct word
  containsExactMatch(string, letter) {
    //"EACT"
    const correctWordSlice = this.props.correctWord.slice(
      this.props.correctWord.length - string.length
    );
    //"REAT"
    for (let a = 0; a < correctWordSlice.length; a++) {
      if (correctWordSlice[a] == letter && correctWordSlice[a] == string[a]) {
        //console.log("Exact match found: " + correctWordSlice[a]);
        return true;
      }
    }
    return false;
  }

  //helper method removeExactMatches
  removeExactMatches(guess, correct) {
    for (let a = 0; a < correct.length; a++) {
      if (guess[a] == correct[a]) {
        //console.log("Exact match found: " + guess[a] + " in index " + a);
        return this.removeExactMatches(
          guess.slice(0, a) + guess.slice(a + 1),
          correct.slice(0, a) + correct.slice(a + 1)
        );
      }
    }
    return guess;
  }

  //helper method countExactMatches
  countExactMatches(guess, correct) {
    let count = 0;
    for (let a = 0; a < guess.length; a++) {
      if (guess[a] == correct[a]) {
        count++;
      }
    }
    return count;
  }

  //helper method numExactMatchesBefore
  numExactMatchesBefore(guess, correct, index) {
    return this.countExactMatches(guess.slice(0, index), correct);
  }

  //helper method instancesOf
  instancesOf(letter, string) {
    let filter = string.match(new RegExp(letter, "g") || []);
    return filter.length;
  }

  //assign letterActives based on guess
  assignLetterClass(index) {
    let guessLetter = this.state.lettersArray[index];
    let correctWord = this.props.correctWord;
    let guessWord = this.state.lettersArray.join("").toString();
    let cleanedUpGuessWord = this.removeExactMatches(guessWord, correctWord);
    let cleanedUpCorrectWord = this.removeExactMatches(correctWord, guessWord);
    let pastSlice = cleanedUpGuessWord.slice(
      0,
      index - this.numExactMatchesBefore(guessWord, correctWord, index)
    );

    //simple case: exact match
    if (correctWord[index] == guessLetter) {
      return "correct-right-place";
    }

    //simple case: no match
    if (!correctWord.includes(guessLetter)) {
      return "unknown";
    } else if (!cleanedUpCorrectWord.includes(guessLetter)) {
      return "unknown";
    }

    //harder case: right letter but wrong place
    //first clause: first guess of this letter always returns correct-wrong-place
    if (!pastSlice.includes(guessLetter)) {
      return "correct-wrong-place";
    }
    if (
      this.instancesOf(guessLetter, cleanedUpCorrectWord) <=
      this.instancesOf(guessLetter, pastSlice)
    ) {
      console.log("Made it here!");
      return "unknown";
    }

    //second clause: we have already guessed the letter
    if (
      //and there is another one in the correct word

      this.instancesOf(guessLetter, cleanedUpCorrectWord) != null &&
      this.instancesOf(guessLetter, cleanedUpCorrectWord).length > 1
      //
    ) {
      console.log("cleanedUpCorrectWord: " + cleanedUpCorrectWord);
      return "correct-wrong-place";
    }
    return "correct-wrong-place";
  }

  render() {
    let wordClass = `word-box ${this.props.wordStates[this.props.wordId]}`;
    return (
      <div>
        {/* {(this.state.wordState == "inactive" ||
          this.state.wordState == "inactive-past") && ( */}
        <div className={wordClass}>
          <LetterBox
            ref={(ch) => (this.letter0 = ch)}
            lettersArray = {this.state.lettersArray}
            letterId={0}
            focusBackward ={(index) => this.focusBackward(index)}
            assignLetterClass={(index) => this.assignLetterClass(index)}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            updateWord={(letter, index, focus) => this.updateWord(letter, index, focus)}
          />
          <LetterBox
            ref={(ch) => (this.letter1 = ch)}
            lettersArray = {this.state.lettersArray}
            letterId={1}
            focusBackward ={(index) => this.focusBackward(index)}
            assignLetterClass={(index) => this.assignLetterClass(index)}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            updateWord={(letter, index, focus) => this.updateWord(letter, index, focus)}
          />
          <LetterBox
            ref={(ch) => (this.letter2 = ch)}
            lettersArray = {this.state.lettersArray}
            letterId={2}
            focusBackward ={(index) => this.focusBackward(index)}
            assignLetterClass={(index) => this.assignLetterClass(index)}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            updateWord={(letter, index, focus) => this.updateWord(letter, index, focus)}
          />
          <LetterBox
            ref={(ch) => (this.letter3 = ch)}
            lettersArray = {this.state.lettersArray}
            letterId={3}
            focusBackward ={(index) => this.focusBackward(index)}
            assignLetterClass={(index) => this.assignLetterClass(index)}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            updateWord={(letter, index, focus) => this.updateWord(letter, index, focus)}
          />
          <LetterBox
            ref={(ch) => (this.letter4 = ch)}
            lettersArray = {this.state.lettersArray}
            letterId={4}
            focusBackward ={(index) => this.focusBackward(index)}
            assignLetterClass={(index) => this.assignLetterClass(index)}
            wordId={this.props.wordId}
            wordStates={this.props.wordStates}
            updateWord={(letter, index, focus) => this.updateWord(letter, index, focus)}
          />

          {this.props.wordStates[this.props.wordId] == "active" && (
            <EnterButton
              wordId={this.props.wordId}
              wordStates={this.props.wordStates}
              makeGuess={(letters, id) => this.props.makeGuess(letters, id)}
              lettersArray={this.state.lettersArray.join("")}
              nextWord={() => this.props.nextWord()}
            />
          )}
        </div>
        {/* )} */}
      </div>
    );
  }
}
