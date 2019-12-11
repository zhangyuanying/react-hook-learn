import React, { useDebugValue, useState } from "react";

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(false);

  // ...

  // 在开发者工具中的这个 Hook 旁边显示标签
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? "Online" : "Offline");

  return isOnline;
}

function Demo11() {
  const isOnline = useFriendStatus(567);
  return <div>朋友是否在线：{isOnline ? "在线" : "离线"}</div>;
}

export default Demo11;
