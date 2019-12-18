import React from "react";

class RenderPropsBind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initialvalue || ""
    };
  }
  onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const newProps = {
      value: this.state.value,
      onChange: this.onChange
    };
    return <>{this.props.children(newProps)}</>;
  }
}

export default RenderPropsBind;
