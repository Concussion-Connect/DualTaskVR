import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "./firestore";
import getSessionInfo from "./sessionInfo";

// const wordList2DArray = [
//   ["Elbow", "Apple", "Carpet", "Saddle", "Bubble"],
//   ["Candle", "Paper", "Sugar", "Sandwich", "Wagon"],
//   ["Baby", "Monkey", "Perfume", "Sunset", "Iron"],
//   ["Finger", "Penny", "Blanket", "Lemon", "Insect"]
// ];

// const wordList = ["baby", "monkey", "perfume", "sunset", "iron"]

const db = firebase.firestore();

// const wordListChosen = 0;

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionPin: this.props.match.params.sessionPin,
      currentTrial: parseInt(this.props.match.params.currentTrial),
      wordList: this.props.match.params.wordList,
      testType: this.props.match.params.testType,
      showVR: this.props.match.params.showVR == "true",
      // displayVideo: true,
      // displayWordList: false,
      content: ""
    };
    this.sessionInfo = getSessionInfo(this.state.testType, this.state.wordList, this.state.showVR);
    this.videoName = this.sessionInfo[this.state.currentTrial].videoName;
    this.sessionChanger = React.createRef();
    this.videoPlayer = React.createRef();
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
    if (docData) {
      let currentTrialUpdated = docData.currentTrial != this.state.currentTrial;
      if (currentTrialUpdated) {
        this.setState({
          currentTrial: docData.currentTrial,
          testType: docData.testType
        })
        this.sessionChanger.current.click();
        this.videoPlayer.current.load()
        // window.location.reload();
      }
    } else {
      window.location.replace('/');
    }
  }

  onVideoEnd() {
    let isFinalVideo = this.state.currentTrial == this.sessionInfo.length - 1;
    // if (isFinalVideo) {
    //   window.location.replace('/');
    // } 
    console.log("Video end");
    // else if (showWordList) {
    //   console.log("Show the word list!");
    //   this.displayWordList();
    // }
  }

  // displayWordList() {
  //   let wordIndex = 0;
  //   this.setState({
  //     displayVideo: false,
  //     displayWordList: true
  //   });
  //   this.setState({
  //     content: wordList2DArray[wordListChosen][wordIndex]
  //   });  
  //   let displayInterval = setInterval(() => {
  //     wordIndex++;
  //     this.setState({
  //       content: wordList2DArray[wordListChosen][wordIndex]
  //     });
  //     if (wordIndex == wordList.length) {
  //       clearInterval(displayInterval);
  //       this.setState({
  //         displayWordList: false,
  //         displayTrialEnd: true,
  //       });    
  //     }
  //   }, 3500);
  // }

  render() {
    return (
      <div className="App full-cover">
        <video ref={this.videoPlayer} className="full-cover" onEnded={() => this.onVideoEnd()} controls muted autoPlay>
          <source src={`/video/${this.state.testType}/${this.videoName}`} type="video/mp4"></source>
        </video>
        {/* <div className={this.state.displayWordList ? "word-list-display" : "hidden"}>
          <div>{this.state.content}</div>
        </div> */}
        <Link to={`/session/${this.state.sessionPin}/${this.state.currentTrial}/${this.state.wordList}/${this.state.testType}/${this.state.showVR}`}>
          <div className="hidden" ref={this.sessionChanger}>Fish Taco</div>
        </Link>
      </div>
    )
  }
}
