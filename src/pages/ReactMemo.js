import React, { useState } from "react";
import { Button } from "antd";

function Memo1({ count }) {
  console.log("render-memo1");

  return <div>Memo1: {count.count1}</div>;
}

function Memo2_({ count }) {
  console.log("render-memo2");
  return <div>Memo2: {count.count2}</div>;
}

const Memo2 = React.memo(Memo2_, (prev, next) => {
  console.log("Memo2====>React.memo", prev, next);
  return true;
});

export function ReactMemo() {
  const [count, setCount] = useState({
    count1: 0,
    count2: 0
  });
  return (
    <div>
      <h3>ReactMemo</h3>
      <Button onClick={() => setCount({ ...count, count1: count.count1 + 1 })}>
        count1 + 1
      </Button>
      <Button onClick={() => setCount({ ...count, count2: count.count2 + 1 })}>
        count2 + 1
      </Button>

      <Memo1 count={count} />
      <Memo2 count={count} />
    </div>
  );
}
