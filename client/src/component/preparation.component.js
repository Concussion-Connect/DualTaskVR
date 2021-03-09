import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "./firestore";

const db = firebase.firestore();

export default class Preparation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionPin: this.props.match.params.sessionPin
    };
  }

  componentDidMount() {
    const sessionsRef = db.collection('sessions')
                          .doc(this.state.sessionPin);
    sessionsRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data: ", doc.data());
        this.setState({
          currentTrial: doc.data().currentTrial,
          wordList: doc.data().wordList
        })
      } else {
        console.log("No such document!");
      }
    })
  }

  render() {
    return (
      <div className="App App-header">
        <div className="container">
          <div>
            <h2>Session Preparation</h2>
            <ul className="no-bullets">
              <li>Make sure your device is in landscape mode.</li>
              <li>Place your device into the VR headset.</li>
              <li>Press "Join" when you're ready!</li>
            </ul>
            <Link to={`/session/${this.state.sessionPin}/${this.state.currentTrial}/${this.state.wordList}`}>
              <button className="action-btn">Join</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
