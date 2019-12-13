import React from "react";
import InputHook from "../components/input-hook";
import Mouse from "../components/mouse";
import Ssq from "./ssq";

function BindInput() {
  return (
    <div>
      {/* <p>双向绑定 useHooks: </p> */}
      {/* <InputHook /> */}
      <p>fetch绑定</p>
      <Ssq />
    </div>
  );
}
export default BindInput;
