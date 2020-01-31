import React from "react";
import useCustom from "./useCustom";
import { Divider } from "antd";
import { Demo4 } from "./demo4";

const Demo3 = () => {
  const [globalState, actions] = useCustom();

  const add1Global = () => {
    actions.addToCounter(1);
  };

  return (
    <div>
      <Divider />
      <p>demo3</p>
      <p>
        counter:
        {globalState.counter}
      </p>
      <Demo4 />
    </div>
  );
};

export default Demo3;
