import React from "react";
import useCustom from "./useCustom";

const Counter = () => {
  const [globalState, actions] = useCustom();

  const add1Global = () => {
    actions.addToCounter(1);
  };

  return (
    <div>
      <p>
        全局counter:
        {globalState.counter}
      </p>
      <button type="button" onClick={add1Global}>
        global Counter + 1
      </button>
      <button type="button" onClick={() => actions.minusToCounter(1)}>
        global Counter - 1
      </button>
    </div>
  );
};

export default Counter;
