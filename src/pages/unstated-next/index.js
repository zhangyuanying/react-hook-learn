import React from "react";
import { Counter } from "../../components/use-hook/use-count";
import { Demo1 } from "./demo1";
import { Demo2 } from "./demo2";

export function UnStatedNext() {
  return (
    <div>
      <Counter.Provider>
        <Demo1 />
        <Demo2 />
      </Counter.Provider>
    </div>
  );
}
