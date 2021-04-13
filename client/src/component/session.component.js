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
      currentTrial: parseInt(this.props.match.params.currentTrial),
      wordList: this.props.match.params.wordList,
      testType: this.props.match.params.testType,
      showVR: this.props.match.params.showVR == "true",
      displayVideo: true,
      displayWordList: false,
      displayTrialEnd: false,
      content: ""
    };
    this.sessionInfo = getSessionInfo(this.state.testType, this.state.showVR);
    this.videoName = this.sessionInfo[this.state.currentTrial].videoName;
    this.sessionChanger = React.createRef();
    this.sessionHasUpdated = this.sessionHasUpdated.bind(this);
  }
    
  async componentDidMount() {
    db.collection("sessions").doc(this.state.sessionPin)
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        this.sessionHasUpdated(doc.data());
    });
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
    let isFinalVideo = this.state.currentTrial == this.sessionInfo.length - 1;
    let showWordList = this.sessionInfo[this.state.currentTrial].showWordList;
    if (isFinalVideo) {
      window.location.replace('/');
    } else if (showWordList) {
      console.log("Show the word list!");
      this.displayWordList();
    }
  }

  displayWordList() {
    let wordIndex = 0;
    this.setState({
      displayVideo: false,
      displayWordList: true
    });
    this.setState({
      content: wordList2DArray[wordListChosen][wordIndex]
    });  
    let displayInterval = setInterval(() => {
      wordIndex++;
      this.setState({
        content: wordList2DArray[wordListChosen][wordIndex]
      });
      if (wordIndex == wordList.length) {
        clearInterval(displayInterval);
        this.setState({
          displayWordList: false,
          displayTrialEnd: true,
        });    
      }
    }, 3500);
  }

  render() {
    return (
      <div className="App full-cover">
        <video className={this.state.displayVideo ? "full-cover" : "hidden"} onEnded={() => this.onVideoEnd()} controls autoPlay webkit-playsinline playsinline>
          <source src={`/video/${this.state.testType}/${this.videoName}`} type="video/mp4"></source>
        </video>
        <div className={this.state.displayWordList ? "word-list-display" : "hidden"}>
          <div>{this.state.content}</div>
        </div>
        <img 
          className={this.state.displayTrialEnd ? "full-cover" : "hidden"}
          src={`/image/end_of_trial`}
          alt="Stop! The Trial is Over!"
        />
        <Link to={`/session/${this.state.sessionPin}/${this.state.currentTrial}/${this.state.wordList}/${this.state.testType}/${this.state.showVR}`}>
          <div className="hidden" ref={this.sessionChanger}>Fish Taco</div>
        </Link>
      </div>
    )
  }
}