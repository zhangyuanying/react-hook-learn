import React from "react";

export const renderTime = () => {
  const currentTime = new Date().toLocaleTimeString();
  return (
    <>
      Rendered at: <p className="render-time">{currentTime}</p>
    </>
  );
};
