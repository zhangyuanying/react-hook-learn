import React, { useState } from "react";

function useBind(initialValue) {
  const [value, setValue] = useState(initialValue || "");
  const onChange = e => {
    setValue(e.target.value);
  };
  return { value, onChange };
}

class RenderBind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue
    };
  }
  onChange = e => {
    this.setState({ value: e.target.value });
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };
  render() {
    return (
      <>
        {this.props.children({
          value: this.state.value,
          onChange: this.onChange
        })}
      </>
    );
  }
}

const HocBind = WrapperComponent =>
  class extends React.Component {
    state = {
      value: this.props.initialValue
    };
    onChange = e => {
      this.setState({ value: e.target.value });
      if (this.props.onChange) {
        this.props.onChange(e.target.value);
      }
    };
    render() {
      const newProps = {
        value: this.state.value,
        onChange: this.onChange
      };
      return <WrapperComponent {...newProps} />;
    }
  };

export { useBind, RenderBind, HocBind };
