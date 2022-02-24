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
      currentWordIndex: 0,
      correctWord: "REACT",
    };
  }

  //increase currentWordIndex state by 1
  nextWord() {
    let newWordNumber = this.state.currentWordIndex;
    newWordNumber++;
    this.setState({ currentWordIndex: newWordNumber });
  }

  //disable the current guess only if it is a valid 5 letter word
  guess(id) {
      let newArray = [...this.state.wordStates];
      newArray[id] = "inactive-previous";
      newArray[id+1] = "active";
      this.setState({ wordStates: newArray });
  }

  render() {
    return (
      <div className="words-sequence">
        <Word
          id="0-word"
          wordId={0}
          guess={(id) => this.guess(id)}
          correctWord={this.state.correctWord}
          currentWordIndex={this.state.currentWordIndex}
          wordStates={this.state.wordStates}
          nextWord={() => this.nextWord()}
        />
        <Word
          id="1-word"
          wordId={1}
          guess={(id) => this.guess(id)}
          correctWord={this.state.correctWord}
          currentWordIndex={this.state.currentWordIndex}
          wordStates={this.state.wordStates}
          nextWord={() => this.nextWord()}
        />
        <Word
          id="2-word"
          wordId={2}
          guess={(id) => this.guess(id)}
          correctWord={this.state.correctWord}
          currentWordIndex={this.state.currentWordIndex}
          wordStates={this.state.wordStates}
          nextWord={() => this.nextWord()}
        />
        <Word
          id="3-word"
          wordId={3}
          guess={(id) => this.guess(id)}
          correctWord={this.state.correctWord}
          currentWordIndex={this.state.currentWordIndex}
          wordStates={this.state.wordStates}
          nextWord={() => this.nextWord()}
        />
        <Word
          id="4-word"
          wordId={4}
          guess={(id) => this.guess(id)}
          correctWord={this.state.correctWord}
          currentWordIndex={this.state.currentWordIndex}
          wordStates={this.state.wordStates}
          nextWord={() => this.nextWord()}
        />
        <Word
          id="5-word"
          wordId={5}
          guess={(id) => this.guess(id)}
          correctWord={this.state.correctWord}
          currentWordIndex={this.state.currentWordIndex}
          wordStates={this.state.wordStates}
          nextWord={() => this.nextWord()}
        />
        <p>currentWordIndex:{this.state.currentWordIndex}</p>
      </div>
    );
  }
}
