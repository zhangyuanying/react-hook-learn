import React, { useState, useEffect, useRef } from "react";

function Demo4() {
  useEffect(() => {
    console.log("useEffect1");
    const timeId = setTimeout(() => {
      console.log("useEffect1-setTimeout-2000");
    }, 2000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);
  useEffect(() => {
    console.log("useEffect2");
    const timeId = setTimeout(() => {
      console.log("useEffect2-setInterval-1000");
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);
  return (
    <div>
      {(() => {
        console.log("render");
        return null;
      })()}
      <p>demo4</p>
    </div>
  );
}
export default Demo4;
