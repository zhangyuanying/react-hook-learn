import React, { useMemo, useState } from "react";
import useFetch from "../components/use-hook/use-fetch";
import { getSsq } from "../api";

function Ssq() {
  // const params = useMemo(() => ({ code: "ssq" }), []);
  // const data = useFetch(getSsq, JSON.stringify({ code: "ssq" }));
  const [visible, setVisible] = useState(false);
  const { data, doFetch, reFetch, loading } = useFetch(getSsq, { code: "ssq" });
  console.log("render");
  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div>
          开奖号码：{data.openCode}
          <button onClick={() => doFetch({ code: "fc3d" })}>福彩3D</button>
          <p>
            <button onClick={() => setVisible(true)}>弹出modal</button>
            {visible && "modal 出现"}
          </p>
          <button onClick={reFetch}>刷新页面</button>
        </div>
      )}
    </div>
  );
}

export default Ssq;
