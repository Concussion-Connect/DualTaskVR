import React, {Component} from 'react';

export default class User extends Component {
    constructor() {
        super();
        this.state = {
            currentTrial: -1,
            wordList: -1
        };
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        });
        this.getUser();
    }

    addUser = e => {
        e.preventDefault();
        const sessionsRef = db.collection('sessions').doc('121212').set({
            currentTrial: this.state.currentTrial,
            wordList: this.state.wordList
        });
        this.setState({
            currentTrial: -1,
            wordList: -1
        });
    };

    getUser = e => {
        const sessionsRef = db.collection('sessions').doc('121212');
        sessionsRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data: ", doc.data());
            } else {
                console.log("No such document!");
            }
        })
    }

    render() {
      return (
        <form>
          <input
            type="number"
            name="currentTrial"
            placeholder="Current Trial"
            onChange={this.updateInput}
            value={this.state.currentTrial}
          />
          <input
            type="number"
            name="wordList"
            placeholder="Word List"
            onChange={this.updateInput}
            value={this.state.wordList}
          />
          <button type="submit" onClick={this.addUser}>Submit</button>
        </form>
        );
      }
   }
