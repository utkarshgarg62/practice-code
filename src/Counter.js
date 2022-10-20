import React from "react";
import "./Counter.css"


class Counter extends React.Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
    }

    increaseCounter() {
        this.setState({
            count: this.state.count + 1
        })
    }
    decreaseCounter() {
        this.setState({
            count: this.state.count - 1
        })
    }

    render() {
        return (
            <div className="count-component">
                <p>Count - {this.state.count}</p>
                <button onClick={() => { this.increaseCounter() }} > + Increase</button>
                <button onClick={() => { this.decreaseCounter() }} > - Decrease</button>
            </div>
        );
    }
}

export default Counter