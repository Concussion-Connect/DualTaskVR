import React, { Component } from 'react';
import { Link } from "react-router-dom";
import firebase from "./firestore";

const db = firebase.firestore();

export default class JoinSession extends Component {
  constructor() {
    super();
    this.state = {
        sessionPin: ""
    };
    this.submitSessionPin = React.createRef();
    this.validateSession = this.validateSession.bind(this);
  }

  componentDidMount() {
    console.log(process.env);
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validateSession() {
    const sessionsRef = db.collection('sessions')
                          .doc(this.state.sessionPin);
    sessionsRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data: ", doc.data());
        this.props.history.push(`/preparation/${this.state.sessionPin}`);
        // this.submitSessionPin.current.click();
      } else {
        console.log("No such document!");
      }
    })
  }

  render() {
    return (
      <div className="App App-header">
        <div className="container">
          <h1>Dual Task Trainer</h1>
          <div className="alert alert-danger" role="alert">
            There is not an active session with that session pin.
          </div>
          <input 
            type="text"
            id="session-pin" 
            name="sessionPin" 
            placeholder="Session Pin"
            onChange={ this.updateInput }
            value={ this.state.sessionPin }
          />
          <div>
              <button
                type="submit"
                class="action-btn"
                onClick={this.validateSession}
              >Join Session</button>
          </div>
          <Link to={`/preparation/${this.state.sessionPin}`}>
            <div className="hidden" ref={this.submitSessionPin}>Fish</div>
          </Link>
        </div>
      </div>
    )
  }
}
