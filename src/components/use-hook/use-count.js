import { useState } from "react";
import { createContainer } from "unstated-next";

export const Counter = createContainer((initialState = 0) => {
  let [count, setCount] = useState(initialState);
  let decrement = () => setCount(count - 1);
  let increment = () => setCount(count + 1);
  return { count, decrement, increment };
});
