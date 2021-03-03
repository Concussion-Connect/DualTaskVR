import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "./firestore";

const db = firebase.firestore();

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionPin: this.props.match.params.sessionPin,
      currentTrial: this.props.match.params.currentTrial,
      wordList: this.props.match.params.wordList
    };
    this.sessionChanger = React.createRef();
    this.sessionHasUpdated = this.sessionHasUpdated.bind(this);
  }
    
  componentDidMount() {
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
    let isFinalVideo = this.state.currentTrial == 4;
    if (isFinalVideo) {
      window.location.replace('/');
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <video onEnded={() => this.onVideoEnd()} controls muted autoPlay>
            <source src={`/video/${this.state.currentTrial}`} type="video/mp4"></source>
          </video>
          <Link to={`/session/${this.state.sessionPin}/${this.state.currentTrial}/${this.state.wordList}`}>
            <div className="hidden" ref={this.sessionChanger}>Fish</div>
          </Link>
        </header>
      </div>
    )
  }
}