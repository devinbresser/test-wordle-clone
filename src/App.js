import React, { Component } from "react";
import WordBox from "./WordBox";
import Header from "./Header"


export default function App() {
  return (
    <div className="app">
      <Header />
      <WordBox correctWord="DEERS" />
    </div>
  );
}