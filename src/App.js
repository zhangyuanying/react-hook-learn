import React, { useEffect } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
import DeepLearn from "./components/deep-learn";
import { Divider } from "antd";
import useCustom from "./components/deep-learn/global-state/useCustom";
import { UnStatedNext } from "./pages/unstated-next";
import { ReactMemo } from "./pages/ReactMemo";

const Hoc = inheritHOC(Stateful);

const HocBase = inheritHOC(Base);

const InputBind = BindHoc(Input);

function App() {
  const [globalState, actions] = useCustom();
  useEffect(() => {
    console.log("全局state发生了变化");
  }, [globalState]);
  return (
    <div className="App">
      <Router>
        <div>
          <Link to="/">组件发展</Link>
          <Link to="/hooks">hooks 学习</Link>
          <Link to="/combine-component">组合组件</Link>
          <Link to="/page">Table</Link>
          <Link to="/deep-hook">深入hook用法</Link>
          <Link to="/unstated-next">unstated-next状态管理</Link>
          <Link to="/react-memo">react-memo</Link>

          <Divider />
          <p>globalState: {globalState.counter}</p>
          <Divider />
          <Switch>
            <Route exact path="/">
              <p>Stateless </p>
              <Stateless />
              <p>Stateful </p>
              <Stateful />
              <p>HOC </p>
              <HocBase />
              <p>HOC JSON化数据</p>
              <Hoc data={[1, [2, [3, [4, [5, [6, 7]]]]]]} />

              <br />
              <p>双向绑定 HOC: </p>
              <InputBind initialvalue="initialValue" />
              <br />
              <p>双向绑定 RenderProps HOC: </p>
              <RenderPropsBind initialvalue="initialValue">
                {props => <Input {...props} />}
              </RenderPropsBind>
            </Route>
            <Route path="/hooks">
              <Hooks />
            </Route>
            <Route path="/combine-component">
              <p>组合式组件</p>
              <GroupButton
                onChange={e => {
                  console.log("onChange", e);
                }}
              >
                <Button value="red">red</Button>
                <Button value="yellow">yellow</Button>
                <Button value="blue">blue</Button>
                <Button value="white">white</Button>
              </GroupButton>
            </Route>
            <Route path="/page">
              <Page />
            </Route>
            <Route path="/deep-hook">
              <DeepLearn />
            </Route>
            <Route path="/unstated-next">
              <UnStatedNext />
            </Route>
            <Route path="/react-memo">
              <ReactMemo />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
