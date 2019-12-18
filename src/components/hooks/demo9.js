import React, { useState, useMemo, useCallback } from "react";

function Demo9() {
  const [count, setCount] = useState(0);
  const handle = () => {
    console.log("handle", count);
    return count;
  };

  // const computeFn = useMemo(() => [1,2,3,4], []);

  const handle1 = useMemo(() => {
    console.log("handle1", count);
    return count;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handle2 = useMemo(() => {
    console.log("handle2", count);
    // 大计算量的方法
    return count;
  }, [count]);

  console.log("render-parent");

  return (
    <div>
      <p>
        demo9: {count}
        <button onClick={() => setCount(count + 1)}>++count</button>
      </p>
      <p>-------------------</p>
      <Child handle={handle1} />
    </div>
  );
}

function Child({ handle }) {
  console.log("render-child");
  // const handleMemo = useMemo(() => {
  //   // ... jisuan
  //   return handle * 10;
  // }, [handle]);
  return (
    <div>
      <p>child</p>
      <p>props-data: {handle}</p>
    </div>
  );
}

export default Demo9;
