import React from "react";
import useCustom from "./useCustom";

export function WDemo4() {
  const [globalState, actions] = useCustom();
  return (
    <div>
      Demo4
      <p>{globalState.counter}</p>
    </div>
  );
}

export class Demo4 extends React.Component {
  render() {
    return <WDemo4 />;
  }
}
