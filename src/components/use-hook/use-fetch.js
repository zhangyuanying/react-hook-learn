import { useState, useEffect, useCallback } from "react";

function useFetch(fetch, params, visible = true) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [newParams, setNewParams] = useState(params);
  const fetchApi = useCallback(async () => {
    // console.log("useCallback");
    if (visible) {
      setLoading(true);
      // console.log("fetch===>");
      const res = await fetch(newParams);
      if (res.code === 1) {
        setData(res.data);
      }
      setLoading(false);
    }
  }, [fetch, newParams, visible]);

  useEffect(() => {
    // console.log("useEffect");
    fetchApi();
  }, [fetchApi]);

  const doFetch = useCallback(rest => {
    setNewParams(rest);
  }, []);

  const reFetch = () => {
    setNewParams(Object.assign({}, newParams));
  };
  return {
    loading,
    data,
    doFetch,
    reFetch
  };
}

export default useFetch;
