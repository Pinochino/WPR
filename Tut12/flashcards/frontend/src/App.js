import "./App.css";
import React from "react";
import Flashcard from "./Flashcard";
import FlashcardContainer from "./FlashcardContainer";
import Statusbar from "./StatusBar";

// const dict = {
//   pretty: "xinh đẹp",
//   car: "xe hơi",
//   study: "học tập",
//   life: "cuộc sống",
//   enormous: "to lớn",
//   computer: "máy tính",
// };

// const words = Object.keys(dict);
// const meanings = Object.values(dict);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 1,
      wordCount: 0,
      word: '',
      meaning: '',
    };
  }
  nextWord = async (step) => {
    const res2 = await fetch('http://localhost:8000/getword/' + this.state.index)
    const obj2 = await res2.json();

    this.setState({
      ...this.state,
      index: this.state.index + step,
      word: obj2.word,
      meaning: obj2.def
    })
    this.setState({
      index: this.state.index + step,
    });
  };

init = async () => {
  const res = await fetch(`http://localhost:8000/wordcount`);
  const object = await res.json()
  console.log(object);

  const res2 = await fetch('http://localhost:8000/getword/' + this.state.index)
  const object2 = await res2.json();

  this.setState({
    ...this.state, 
    wordCount: object.wordCount,
    word: object2.word,
    meaning: object2.def,
  })
}


  render() {
    let indexValue = this.state.index;
    return (
      <div className="main" id="main">
        <FlashcardContainer
          word={this.state.word}
          definition={this.state.meaning}
        />
        <Statusbar
          wordIndex={indexValue}
          wordCount={this.state.wordCount}
          back={() => this.nextWord(-1)}
          next={() => this.nextWord(1)}
        />
      </div>
    );
  }
}

export default App;
