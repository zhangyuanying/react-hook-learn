import React, { useState } from "react";

function Demo1() {
  const [count, setCount] = useState(0);
  const [obj, setData] = useState({});
  const newListener = React.useState(0);
  console.log("render", newListener);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          console.log("click-setCount");
          setCount(count + 1);
        }}
      >
        click-setCount
      </button>
      <button
        onClick={() => {
          console.log("click-setData");
          setData({});
        }}
      >
        click-setData
      </button>
    </div>
  );
}

// class Demo1 extends React.Component {
//   state = {
//     count: 1,
//     obj: {}
//   };
//   render() {
//     console.log("render");
//     return (
//       <div>
//         <p>You clicked {this.state.count} times</p>
//         <button
//           onClick={() => {
//             console.log("click-setCount");
//             this.setState({ count: 1 });
//           }}
//         >
//           click-setCount
//         </button>
//         <button
//           onClick={() => {
//             console.log("click-setData");
//             this.setState({ obj: {} });
//           }}
//         >
//           click-setData
//         </button>
//       </div>
//     );
//   }
// }

export default Demo1;
