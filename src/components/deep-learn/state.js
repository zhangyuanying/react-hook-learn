import React, { useReducer } from "react";
import { Button, Divider } from "antd";

// 第一版
// function useState(initialvalue) {
//   let obj = initialvalue;
//   function setObj(value) {
//     obj = value;
//   }
//   return [obj, setObj];
// }

// 第二版
let _cache;
function useState(init) {
  _cache = _cache || init;
  function setState(newState) {
    _cache = newState;
  }
  return [_cache, setState];
}

// 第三版
// let _cache = [];
// let index = 0;
// function useState(init) {
//   _cache[index] = _cache[index] || init;
//   const currentIndex = index;
//   function setState(newState) {
//     _cache[currentIndex] = newState;
//     console.log("useState", _cache, currentIndex, index);
//     // index = 0;
//   }
//   return [_cache[index++], setState];
// }

// function useEffect(callback, deps) {
//   const hasNoDeps = !deps;
//   const cacheState = _cache[index];
//   const hasChangedDeps = cacheState
//     ? !(deps || []).every((el, i) => el === cacheState[i])
//     : true;

//   if (hasNoDeps || hasChangedDeps) {
//     callback();
//     _cache[index] = deps;
//   }
//   index++;
// }

function State() {
  const [data, setData] = useState(0);
  const [data2, setData2] = useState(0);
  console.log('data', data, data2)

  // useEffect(() => {
  //   console.log("useEffect", data);
  // });

  // useEffect(() => {
  //   console.log("useEffect", data);
  // }, [data]);

  const [_, reRender] = React.useState();
  // console.log("render", data, index);
  // index = 0;
  // const [_data_, dispatch] = useReducer((c, t) => ({ ...c, ...t }), {});
  // console.log("_data_", _data_);
  return (
    <div>
      <p>
        {/* {JSON.stringify(_data_)}{" "}
        <Button onClick={() => dispatch({ a: 23 })}>dispatch</Button> */}
      </p>
      <Divider />
      <p>模拟state - data1：{data}</p>
      <p>模拟state - data2：{data2}</p>
      <Button
        onClick={() => {
          setData(data + 1);
          reRender({});
        }}
      >
        setData++
      </Button>
      <Button
        onClick={() => {
          setData2(data2 + 1);
          reRender({});
        }}
      >
        setData2++
      </Button>
    </div>
  );
}

export default State;
