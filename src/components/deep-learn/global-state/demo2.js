import React, { useState } from "react";

import Demo1 from "./demo1";
import { renderTime } from "../../../utils";

function Demo2() {
  const [children, setChilds] = useState([]);
  const addCounter = () => {
    const counter = <Demo1 key={Date.now()} />;
    const newChildren = [...children, counter];
    setChilds(newChildren);
  };
  return (
    <div className="App">
      <h1>父组件</h1>
      <h3>{renderTime()}</h3>
      <button onClick={addCounter}>添加子组件</button>
      <div className="container">{children}</div>
    </div>
  );
}
export default Demo2;
