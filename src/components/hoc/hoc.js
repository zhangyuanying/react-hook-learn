import React from "react";

function inheritHOC(WrappedComponent) {
  // 继承
  return class Component extends WrappedComponent {
    // ...
    getName = () => {
      // console.log("onChangeName");
      return "inheritHOC-Name";
    };
    render() {
      // console.log("继承WrappedComponent-props:", this.props);
      // console.log("继承WrappedComponent-state:", this.state);
      // return super.render();
      // return <div className="hoc">{super.render()}</div>;
      return <div className="hoc">{super.render()}</div>;
    }
  };
}

export default inheritHOC;
