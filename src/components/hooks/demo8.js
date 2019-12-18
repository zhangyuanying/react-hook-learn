import React, { useRef, useEffect, useState, useCallback } from "react";

function Demo() {
  const [data, setData] = useState({});
  const ref = useRef();
  const fetchData = async () => {
    const res = await fetch(
      "https://www.mxnzp.com/api/lottery/common/latest?code=ssq"
    );
    setData(await res.json());
  };
  // const fetchData = useCallback(async () => {
  //   const res = await fetch(
  //     "https://www.mxnzp.com/api/lottery/common/latest?code=ssq"
  //   );
  //   setData(await res.json());
  // }, []);
  // console.log("object", fetchData === ref.current);
  useEffect(() => {
    ref.current = fetchData;
    fetchData();
  }, [fetchData]);
  return <div>demo8: {JSON.stringify(data)}</div>;
}

function Child({ event, data }) {
  const [status, setStatus] = useState(0);
  useEffect(() => {
    console.log("child-useEffect", status);
    setInterval(() => {
      console.log("setInterval");
      setStatus({});
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("child-render");
  return (
    <div>
      <p>{JSON.stringify(status)}</p>
      {/* <p>props-data: {data.data && data.data.openCode}</p> */}
      <button onClick={event}>调用父级event</button>
    </div>
  );
}

const set = new Set();

function Demo8() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});

  // 第一版
  // const handle = async () => {
  //   const response = await fetch(
  //     "https://www.mxnzp.com/api/lottery/common/latest?code=ssq"
  //   );
  //   const res = await response.json();
  //   console.log("handle", data);
  //   setData(res);
  // };

  // 第二版
  // const handle = useCallback(async () => {
  //   const response = await fetch(
  //     "https://www.mxnzp.com/api/lottery/common/latest?code=ssq"
  //   );
  //   const res = await response.json();
  //   console.log("handle-useCallback", data);
  //   setData(res);
  // });

  // 第三版
  // const handle = useCallback(async () => {
  //   const response = await fetch(
  //     "https://www.mxnzp.com/api/lottery/common/latest?code=ssq"
  //   );
  //   const res = await response.json();
  //   console.log("handle-useCallback", data);
  //   setData(res);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // 第四版
  // const handle = useCallback(async () => {
  //   const response = await fetch(
  //     "https://www.mxnzp.com/api/lottery/common/latest?code=ssq"
  //   );
  //   const res = await response.json();
  //   console.log("handle-useCallback", data);
  //   setData(res);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [count]);

  // 第五版
  const handle = useCallback(async () => {
    const response = await fetch(
      "https://www.mxnzp.com/api/lottery/common/latest?code=ssq"
    );
    const res = await response.json();
    console.log("handle-useCallback", data);
    setData(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  set.add(handle);
  console.log("parent-render====>", data);
  return (
    <div>
      <button
        onClick={e => {
          setCount(count + 1);
        }}
      >
        count++
      </button>
      <p>set size: {set.size}</p>
      <p>count:{count}</p>
      <p>data: {data.data && data.data.openCode}</p>
      <p>-------------------------------</p>
      <Child event={handle} />
    </div>
  );
}

export default Demo8;
