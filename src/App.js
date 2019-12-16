import React from "react";
import "./App.css";
import Stateless from "./components/stateless";
import Stateful from "./components/stateful";
import inheritHOC from "./components/hoc/hoc";
import BindHoc from "./components/hoc/bind-hoc";
import Input from "./components/input";
import RenderPropsBind from "./components/render-props/render-props-bind";
import InputHook from "./components/input-hook";
import Base from "./components/hoc/base";
import GroupButton, { Button } from "./components/combine/group-button";
import Mouse from "./components/mouse";
import Hooks from "./components/hooks";
import Page from "./pages";

import "antd/dist/antd.css";

const Hoc = inheritHOC(Stateful);

const HocBase = inheritHOC(Base);

const InputBind = BindHoc(Input);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {
    // console.log("componentDidMount", this.ref.current);
    if (this.ref.current) {
      this.ref.current.focus();
    }
  }
  render() {
    return (
      <div className="App">
        {/* <Stateless /> */}
        {/* <Stateful /> */}

        {/* <HocBase />
        <br />
        <Hoc data={[1, [2, [3, [4, [5, [6, 7]]]]]]} />
        <br /> */}
        {/* <p>双向绑定 HOC: </p>
        <InputBind initialValue="initialValue" ref={this.ref} />
        <br />
        <p>双向绑定 RenderProps HOC: </p>
        <RenderPropsBind initialValue="initialValue">
          {props => <Input {...props} />}
        </RenderPropsBind> */}
        {/* <p>组合式组件</p>
        <GroupButton
          onChange={e => {
            console.log("onChange", e);
          }}
        >
          <Button value="red">red</Button>
          <Button value="yellow">yellow</Button>
          <Button value="blue">blue</Button>
          <Button value="white">white</Button>
        </GroupButton> */}

        {/* <p>-------------------------------------------</p>
        <p>
          <strong>HOOKS</strong>
        </p>
        <Hooks /> */}
        <p>-------------------------------------------</p>
        <Page />
      </div>
    );
  }
}

export default App;
