// import { useState, useEffect } from "react";

// let listeners = [];
// let state = { counter: 0 };

// const setState = newState => {
//   state = { ...state, ...newState };
//   listeners.forEach(listener => {
//     listener(state);
//   });
// };

// const useCustom = () => {
//   const newListener = useState()[1];
//   useEffect(() => {
//     listeners.push(newListener);
//     return () => {
//       listeners = listeners.filter(listener => listener !== newListener);
//     };
//   }, [newListener]);
//   return [state, setState];
// };

// export default useCustom;

import React from "react";
import useGlobalHook from "./useGlobalHook";
import * as actions from "./actions";

const initialState = { counter: 0 };

const useCustom = useGlobalHook(initialState, actions);

export default useCustom;
