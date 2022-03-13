import React, { Component } from "react";
import Word from "./Word";
import Keyboard from "./Keyboard";
const numGuesses = 6;

export default class WordBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordStates: [
        "active",
        "inactive-future",
        "inactive-future",
        "inactive-future",
        "inactive-future",
        "inactive-future",
      ],
      //need a state variable for integer of the current word (for keyboard)
      currentWordIndex: 0,

      //lettersArray: new Array(this.props.correctWord.length).fill(""),
      lettersArray: [...Array(numGuesses)].map((e) =>
        Array(this.props.correctWord.length).fill("")
      ),
    };
  }

  //letter update methods
  //update letter array with new contents
  updateWord(letter, word, index, focus) {
    this.setState({ currentLetterIndex: index });
    let newArray = [...this.state.lettersArray];
    newArray[word][index] = letter;
    this.setState({ lettersArray: newArray });
    console.log("new lettersarray: " + newArray[word]);
    if (focus && index < this.props.correctWord.length - 1) {
      this.focusForward(word, index);
    }
  }

  /////////////////////////////////////////

  focusForward(word, index) {
    // this[`word0.letter${index+1}`].myInput.focus();m
    this[`word${word}`][`letter${index + 1}`].myInput.focus();
  }

  focusBackward(word, index) {
    this[`word${word}`][`letter${index - 1}`].myInput.focus();
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
        return true;
      }
    }
    return false;
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

  //helper method removeExactMatches
  removeExactMatches(guess, correct) {
    for (let a = 0; a < correct.length; a++) {
      if (guess[a] == correct[a]) {
        return this.removeExactMatches(
          guess.slice(0, a) + guess.slice(a + 1),
          correct.slice(0, a) + correct.slice(a + 1)
        );
      }
    }
    return guess;
  }

  //assign letterActives based on guess
  assignLetterClass(index, word) {
    let guessLetter = this.state.lettersArray[word][index];
    let correctWord = this.props.correctWord;
    let guessWord = this.state.lettersArray[word].join("").toString();
    let cleanedUpGuessWord = this.removeExactMatches(guessWord, correctWord);
    let cleanedUpCorrectWord = this.removeExactMatches(correctWord, guessWord);
    let pastSlice = cleanedUpGuessWord.slice(
      0,
      index - this.numExactMatchesBefore(guessWord, correctWord, index)
    );

    //any way to fix the issue this causes?
    //console.log("just got a check request with guessLetter: " + guessLetter + " and correct word: " + correctWord)

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
      return "unknown";
    }

    //second clause: we have already guessed the letter
    if (
      //and there is another one in the correct word

      this.instancesOf(guessLetter, cleanedUpCorrectWord) != null &&
      this.instancesOf(guessLetter, cleanedUpCorrectWord).length > 1
      //
    ) {
      return "correct-wrong-place";
    }
    return "correct-wrong-place";
  }

  ////////////////////////////////////////////////////////

  //advance the current guess only if it is a valid 5 letter word

  componentDidUpdate() {}

  makeGuess(id) {
    //advance word state
    this.setState({ currentWordIndex: id + 1 });
    let newArray = [...this.state.wordStates];
    newArray[id] = "inactive-previous";
    newArray[id + 1] = "active";
    this.setState({ wordStates: newArray });
    //console.table(this.state.lettersArray);
  }

  render() {
    return (
      <div className="words-sequence">
        {[...Array(numGuesses)].map((a, idx) => (
        <div id={`word${idx}`} key={idx}>
          <Word
            ref={(ch) => (this[`word${idx}`] = ch)}
            wordId={idx}
            correctWord={this.props.correctWord}
            makeGuess={(id) => this.makeGuess(id)}
            lettersArray={this.state.lettersArray}
            updateWord={(letter, word, index, focus) =>
              this.updateWord(letter, word, index, focus)
            }
            focusBackward={(word, index) => this.focusBackward(word, index)}
            assignLetterClass={(index, word) =>
              this.assignLetterClass(index, word)
            }
            wordStates={this.state.wordStates}
          />
        </div>

        ))}

        <Keyboard
          lettersArray={this.state.lettersArray}
          wordStates={this.state.wordStates}
          makeGuess={(id) => this.makeGuess(id)}
          currentWordIndex={this.state.currentWordIndex}
          updateWord={(letter, word, index, focus) =>
            this.updateWord(letter, word, index, focus)
          }
          assignLetterClass={(index, word) =>
            this.assignLetterClass(index, word)
          }
          focusBackward={(word, index) => this.focusBackward(word, index)}
        />
      </div>
    );
  }
}
