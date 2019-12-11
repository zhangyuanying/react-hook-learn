import { useState } from "react";

function useMouse() {
  const [pos, setPos] = useState({});
  const onMouseMove = e => {
    setPos({ x: e.screenX, y: e.screenY });
  };
  return { pos, onMouseMove };
}

export default useMouse;
