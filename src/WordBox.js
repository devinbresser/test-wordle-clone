import React, { Component } from "react";
import Word from "./Word";

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
      correctWord: "REACT",
    };
  }

  //increase currentWordIndex state by 1
  nextWord() {
    let newWordNumber = this.state.currentWordIndex;
    newWordNumber++;
    this.setState({ currentWordIndex: newWordNumber });
  }

  //compare the input guess to the correct response
  compareGuess(letters) {
    for(let i=0; i<letters.length; i++){
      if(letters[i]==this.state.correctWord[i]){
        console.log("Correct letter: ", letters[i])
      }
    }
  }

  //disable the current guess only if it is a valid 5 letter word
  makeGuess(letters, id) {
    //compare text to correct response and color accordingly
    this.compareGuess(letters);
    //update states
    let newArray = [...this.state.wordStates];
    newArray[id] = "inactive-previous";
    newArray[id + 1] = "active";
    this.setState({ wordStates: newArray });
  }

  render() {
    return (
      <div className="words-sequence">
        <Word
          id="0-word"
          wordId={0}
          makeGuess={(letters, id) => this.makeGuess(letters, id)}
          wordStates={this.state.wordStates}
          nextWord={() => this.nextWord()}
        />
        <Word
          id="1-word"
          wordId={1}
          makeGuess={(letters, id) => this.makeGuess(letters, id)}
          wordStates={this.state.wordStates}
          nextWord={() => this.nextWord()}
        />
        <Word
          id="2-word"
          wordId={2}
          makeGuess={(letters, id) => this.makeGuess(letters, id)}
          wordStates={this.state.wordStates}
          nextWord={() => this.nextWord()}
        />
        <Word
          id="3-word"
          wordId={3}
          makeGuess={(letters, id) => this.makeGuess(letters, id)}
          wordStates={this.state.wordStates}
          nextWord={() => this.nextWord()}
        />
        <Word
          id="4-word"
          wordId={4}
          makeGuess={(letters, id) => this.makeGuess(letters, id)}
          wordStates={this.state.wordStates}
          nextWord={() => this.nextWord()}
        />
        <Word
          id="5-word"
          wordId={5}
          makeGuess={(letters, id) => this.makeGuess(letters, id)}
          wordStates={this.state.wordStates}
          nextWord={() => this.nextWord()}
        />
      </div>
    );
  }
}
