import React from "react";
import useMouse from "./use-hook/use-mouse";

function Mouse() {
  const { pos, ...rest } = useMouse();
  return (
    <div
      style={{ height: "200px", background: "#efefef", margin: "20px" }}
      {...rest}
    >
      <p>
        鼠标位置：{pos.x} - {pos.y}
      </p>
    </div>
  );
}

export default Mouse;
