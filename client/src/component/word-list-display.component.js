import React, { Component } from 'react';

const wordList = ["baby", "monkey", "perfume", "sunset", "iron"]

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "I wanna replace that guy!"
    };
  }

  handleClick = () => {
    this.props.replace(this.state.content);
  };

  render() {
    return (
      <div className="App">
        <div onClick={this.handleClick} className="text_color">
          {this.state.content}
          fish
        </div>
      </div>
    )
  }
}