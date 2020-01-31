import React from "react";
import { Counter } from "../../components/use-hook/use-count";
import { Button } from "antd";

export function Demo1() {
  const counter = Counter.useContainer();
  return (
    <div>
      <p>UnStatedNext - demo1</p>
      count: {counter.count}
        <div>
          <Button onClick={counter.decrement}>decrement</Button>
          <Button onClick={counter.increment}>increment</Button>
        </div>
    </div>
  );
}
