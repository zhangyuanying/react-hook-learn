import React, { useContext, useState, useMemo, useRef } from "react";

const MyContext = React.createContext();

function Demo5() {
  const [value, setValue] = useState("init");
  console.log("Demo5");
  const child2 = useMemo(() => {
    console.log("222");
    return <Child2 />;
  }, []);
  return (
    <div>
      {(() => {
        console.log("render");
        return null;
      })()}
      <button
        onClick={() => {
          console.log("click：更新value");
          setValue(`${Date.now()}_newValue`);
        }}
      >
        改变value
      </button>
      <MyContext.Provider value={value}>
        <Child1 />
        {/* <Child2 /> */}
        {child2}
      </MyContext.Provider>
    </div>
  );
}

function Child1() {
  const value = useContext(MyContext);
  const ref = useRef();
  console.log("Child1-value", value);
  return <div>Child1-value: {value}</div>;
}

function Child2(props) {
  console.log("Child2");
  return <div>Child2</div>;
}

// const Child2 = React.memo(props => {
//   console.log("Child2");
//   return <div>Child2</div>;
// });

export default Demo5;
