import React, { Component } from "react";

export default class EnterButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button className="enterButton" onClick={() => this.props.toggle()}>
          Guess {this.props.someText.toString()}
        </button>
      </div>
    );
  }
}
