import React, { useState, useEffect, useRef } from "react";

function Hook2() {
  const [value, setValue] = useState(0);
  const refCount = useRef(0);
  console.log("useEffect前", value, refCount.current);
  useEffect(() => {
    console.log("useEffect1", value, refCount.current);
    // setValue(value + 1);
    // setValue(1);
    // refCount.current++;
    console.log("useEffect2", value, refCount.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  console.log("useEffect后", value, refCount.current);
  return (
    <div>
      <p>value: {value}</p>
      <p>refCount.current: {refCount.current}</p>
    </div>
  );
}

export default Hook2;
