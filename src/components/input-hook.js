import React from "react";
import useBind from "./use-hook/use-bind";
import Input from "./input";

function InputHook() {
  const inputProps = useBind("init");
  return <Input {...inputProps} />;
}

export default InputHook;
