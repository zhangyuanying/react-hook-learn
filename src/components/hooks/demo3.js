import React, { useState, useEffect, useRef } from "react";

function Demo3() {
  const [data, setData] = useState();
  useEffect(() => {
    console.log("useEffect--[]");
    fetch("https://www.mxnzp.com/api/lottery/common/latest?code=ssq")
      .then(res => res.json())
      .then(res => {
        setData(res);
      });
  }, []);

  useEffect(() => {
    console.log("useEffect ---> 无依赖");
  });

  useEffect(() => {
    console.log("useEffect 依赖data： data发生了变化");
  }, [data]);

  return (
    <div>
      {(() => {
        console.log("render");
        return null;
      })()}
      <p>data: {JSON.stringify(data)}</p>
    </div>
  );
}

export default Demo3;
