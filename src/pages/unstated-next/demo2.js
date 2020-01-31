import React from "react";
import { Counter } from "../../components/use-hook/use-count";

export function Demo2() {
  const counter = Counter.useContainer();
  return (
    <div>
      <p>UnStatedNext - demo2</p>
      count: {counter.count}
    </div>
  );
}
