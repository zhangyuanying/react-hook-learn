import React from "react";
import "./App.css";
import Stateless from "./components/stateless";
import Stateful from "./components/stateful";
import inheritHOC from "./components/hoc";
import BindHoc from "./components/bind-hoc";
import Input from "./components/input";
import RenderPropsBind from "./components/render-props-bind";

const Hoc = inheritHOC(Stateful);

const InputBind = BindHoc(Input);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {
    console.log("componentDidMount", this.ref.current);
    if (this.ref.current) {
      this.ref.current.focus();
    }
  }
  render() {
    return (
      <div className="App">
        <Stateless />
        <Stateful />
        <br />
        <Hoc />
        <br />
        <p>HOC: </p>
        <InputBind initialValue="initialValue" ref={this.ref} />
        <br />

        <p>RenderProps HOC: </p>
        <RenderPropsBind initialValue="initialValue">
          {props => <Input {...props} />}
        </RenderPropsBind>
      </div>
    );
  }
}

export default App;
