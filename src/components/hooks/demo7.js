import React, { useReducer, useContext } from "react";

const ModalContext = React.createContext();

const visibleReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return { ...state, ...action.payload };
    case "EDIT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

function Demo7() {
  const initModalVisible = {
    create: false,
    edit: false
  };
  const [state, dispatch] = useReducer(visibleReducer, initModalVisible);

  return (
    <ModalContext.Provider value={{ visibles: state, dispatch }}>
      <Demo7Child />
    </ModalContext.Provider>
  );
}

function Demo7Child() {
  return (
    <div>
      Demo7Child
      <Detail />
    </div>
  );
}

function Detail() {
  const { visibles, dispatch } = useContext(ModalContext);
  console.log("contextValue", visibles);
  return (
    <div>
      <p>create: {`${visibles.create}`}</p>
      <button
        onClick={() => dispatch({ type: "CREATE", payload: { create: true } })}
      >
        打开创建modal
      </button>
    </div>
  );
}

export default Demo7;
