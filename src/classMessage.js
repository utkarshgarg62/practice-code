import React, { Component } from "react";

class ClassMessage extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  reset() {
    this.setState({
      count: 0,
    });
  }
  increament() {
    this.setState({
      count: this.state.count + 1,
    });
  }
  decreament() {
    this.setState({
      count: this.state.count - 1,
    });
  }
  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={() => this.increament()}>increament</button>
        <button onClick={() => this.decreament()}>decreament</button>
        <button onClick={() => this.reset()}>reset</button>
      </div>
    );
  }
}
export default ClassMessage;
