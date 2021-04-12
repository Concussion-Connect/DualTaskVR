import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "./firestore";
import getSessionInfo from "./sessionInfo";

const wordList2DArray = [
  ["Elbow", "Apple", "Carpet", "Saddle", "Bubble"],
  ["Candle", "Paper", "Sugar", "Sandwich", "Wagon"],
  ["Baby", "Monkey", "Perfume", "Sunset", "Iron"],
  ["Finger", "Penny", "Blanket", "Lemon", "Insect"]
];

const wordList = ["baby", "monkey", "perfume", "sunset", "iron"]

const db = firebase.firestore();

const wordListChosen = 0;

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionPin: this.props.match.params.sessionPin,
      currentTrial: this.props.match.params.currentTrial,
      wordList: this.props.match.params.wordList,
      displayWorldList: false,
      sessionInfo: [],
      content: ""
    };
    this.videoName = getSessionInfo("clinical")[this.state.currentTrial].videoName;
    this.sessionChanger = React.createRef();
    this.sessionHasUpdated = this.sessionHasUpdated.bind(this);
  }
    
  async componentDidMount() {
    db.collection("sessions").doc(this.state.sessionPin)
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        this.sessionHasUpdated(doc.data());
    });



    try {
      const res = await fetch('/session/info/clinical/true');
      const info = await res.json();
      this.setState({ sessionInfo: info });
      console.log(this.state.sessionInfo);
    } catch (error) {
        console.log(error);
    }
  }

  sessionHasUpdated(docData) {
    let currentTrialUpdated = docData.currentTrial != this.state.currentTrial;
    if (currentTrialUpdated) {
      this.setState({currentTrial: docData.currentTrial})
      this.sessionChanger.current.click();
      window.location.reload();
    }
  }

  onVideoEnd() {
    let isFinalVideo = this.state.currentTrial == this.state.sessionInfo.length  - 1;
    let showWordList = this.state.sessionInfo[this.state.currentTrial].showWordList;
    if (isFinalVideo) {
      window.location.replace('/');
    } else if (showWordList) {
      console.log("Show the word list!");
      this.displayWordList();
    }
  }

  displayWordList() {
    this.setState({
      displayWordList: true
    });    

    let wordIndex = 0;
    let displayInterval = setInterval(() => {
      this.setState({
        content: wordList2DArray[wordListChosen][wordIndex]
      });
      wordIndex++;
      console.log(wordIndex);
      if (wordIndex == wordList.length) {
        clearInterval(displayInterval);
      }
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        <video className={this.state.displayWordList ? "hidden" : "video-player"} onEnded={() => this.onVideoEnd()} controls muted autoPlay>
          <source src={`/video/${this.videoName}`} type="video/mp4"></source>
        </video>
        <p>{this.videoName}</p>
        <div className={this.state.displayWordList ? "word-list-display" : "hidden"}>
          <div>{this.state.content}</div>
        </div>
        <Link to={`/session/${this.state.sessionPin}/${this.state.currentTrial}/${this.state.wordList}`}>
          <div className="hidden" ref={this.sessionChanger}>Fish Taco</div>
        </Link>
      </div>
    )
  }
}