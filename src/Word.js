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
    const correctWordSlice = this.props.correctWord.slice(
      this.props.correctWord.length - string.length
    );
    // console.log('correctWordSlice: ', correctWordSlice)
    // console.log('guessSlice: ', string)
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

  //assign letterStates based on guess
  assignLetterClass(index) {
    let guessLetter = this.state.lettersArray[index];
    let correctWord = this.props.correctWord;
    let guessWord = this.state.lettersArray.join("").toString();
    let cleanedUpGuessWord = this.removeExactMatches(guessWord, correctWord);
    let cleanedUpCorrectWord = this.removeExactMatches(correctWord, guessWord);
    let pastSlice = cleanedUpGuessWord.slice(0, index);
    // let futureSlice = cleanedUpGuessWord
    //   .join("")
    //   .toString()
    //   .slice(index, cleanedUpGuessWord.length);

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

    //harder case: right letter, wrong place
    //first clause: first guess of this letter always returns correct-wrong-place UNLESS there's an exact match
    if (!pastSlice.includes(guessLetter)) {
      //get rid of the first incorrect match from the cleaned up word
      return "correct-wrong-place";
    }

    console.log("guessLetter: " + guessLetter + " pastSlice: " + pastSlice + " cleanedUpCorrectWord: " + cleanedUpCorrectWord);
    
    if (
      //if the number of times we've guessed this already equals the number of occurrences in the correct word, unknown
      pastSlice.match(new RegExp(guessLetter, "g") || []).length ==
      correctWord.match(new RegExp(guessLetter, "g") || []).length
    ) {
      console.log("Made it here!");
      return "unknown";
    }

    //second clause: we have already guessed the letter
    if (
      //and there is another one in the correct word
      cleanedUpCorrectWord.match(new RegExp(guessLetter, "g") || []) != null &&
      cleanedUpCorrectWord.match(new RegExp(guessLetter, "g") || []).length > 1
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
            letterId={0}
            virtualKeyboardChange={(input) => {
              this.props.virtualKeyboardChange(input);
            }}
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
