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

function setState(newState) {
  this.state = { ...this.state, ...newState };
  // 发布更新所有的全局state
  this.listeners.forEach(listener => {
    listener(this.state);
  });
}

function useCustom() {
  const newListener = React.useState()[1];
  React.useEffect(() => {
    this.listeners.push(newListener);
    return () => {
      // Called just before the component unmount
      this.listeners = this.listeners.filter(
        listener => listener !== newListener
      );
    };
  });
  return [this.state, this.actions];
}

function associateActions(store, actions = {}) {
  const associatedActions = {};
  Object.keys(actions).forEach(key => {
    if (typeof actions[key] === "function") {
      associatedActions[key] = actions[key].bind(null, store);
    }
    if (typeof actions[key] === "object") {
      associatedActions[key] = associateActions(store, actions[key]);
    }
  });
  return associatedActions;
}

const useGlobalHook = (initialState, actions) => {
  const store = { state: initialState, listeners: [] };
  store.actions = associateActions(store, actions);
  store.setState = setState.bind(store);
  return useCustom.bind(store);
};

export default useGlobalHook;
