import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "./firestore";
import getSessionInfo from "./sessionInfo";

const db = firebase.firestore();

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionPin: this.props.match.params.sessionPin,
      currentTrial: parseInt(this.props.match.params.currentTrial),
      wordList: this.props.match.params.wordList,
      testType: this.props.match.params.testType,
      showVR: this.props.match.params.showVR == "true",
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
      let currentTestTypeUpdated = docData.testType != this.state.testType;
      if (currentTrialUpdated || currentTestTypeUpdated) {
        this.setState({
          currentTrial: docData.currentTrial,
          testType: docData.testType
        })
        this.sessionInfo = getSessionInfo(this.state.testType, this.state.wordList, this.state.showVR);
        this.videoName = this.sessionInfo[this.state.currentTrial].videoName;
        this.videoPlayer.current.load()
        this.sessionChanger.current.click();
      }
    } else {
      window.location.replace('/');
    }
  }

  render() {
    return (
      <div className="App full-cover">
        <video ref={this.videoPlayer} className="full-cover" onEnded={() => this.onVideoEnd()} controls muted autoPlay>
          <source src={`/video/${this.state.testType}/${this.videoName}`} type="video/mp4"></source>
        </video>
        <Link to={`/session/${this.state.sessionPin}/${this.state.currentTrial}/${this.state.wordList}/${this.state.testType}/${this.state.showVR}`}>
          <div className="hidden" ref={this.sessionChanger}>Fish Taco</div>
        </Link>
      </div>
    )
  }
}
