import React from "react";

function Loading({ loading, children }) {
  return loading ? <div>loading...</div> : children;
}

export default Loading;
