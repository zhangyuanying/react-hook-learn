import React from "react";
import useMeasure from "./use-hook/use-measure";

function MeasureExample() {
  // const [height, setHeight] = useState(0);
  const [rect, ref] = useMeasure();
  // const measuredRef = useCallback(node => {
  //   if (node !== null) {
  //     setHeight(node.getBoundingClientRect().height);
  //     console.log("useCallback");
  //   }
  // }, []);

  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null && (
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      )}
    </>
  );
}

export default MeasureExample;
