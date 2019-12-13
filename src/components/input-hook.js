import React from "react";
import { useBind, RenderBind, HocBind } from "./use-hook/use-bind";

function InputHook() {
  const inputProps = useBind("init");

  const Input = props => (
    <>
      <p>HocBind实现 value:{props.value}</p>
      <input placeholder="input" {...props} />
    </>
  );
  const HocInput = HocBind(Input);
  return (
    <div>
      <p>useBind实现 value:{inputProps.value}</p>
      <input {...inputProps} />

      <RenderBind
        initialValue="init"
        onChange={val => {
          console.log("RenderBind", val);
        }}
      >
        {props => (
          <>
            <p>RenderBind实现 value:{props.value}</p>
            <input placeholder="input" {...props} />
          </>
        )}
      </RenderBind>

      <HocInput
        initialValue="init"
        onChange={val => {
          console.log("HocInput", val);
        }}
      />
    </div>
  );
}

export default InputHook;
