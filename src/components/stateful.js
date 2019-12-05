import React from "react";

class Stateful extends React.Component {
  state = {
    name: "tori"
  };
  componentDidMount() {
    // fetch();
  }
  render() {
    return (
      <p>
        Hello, {this.state.name}{" "}
        <button onClick={() => this.setState({ name: "007" })}>改名</button>
      </p>
    );
  }
}

export default Stateful;
