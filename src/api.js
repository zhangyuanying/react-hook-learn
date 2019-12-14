function objToString(obj = {}, arr = [], index = 0) {
  for (let item in obj) {
    arr[index++] = [item, obj[item]];
  }
  return new URLSearchParams(arr).toString();
}

export const getSsq = params => {
  const url =
    "https://www.mxnzp.com/api/lottery/common/latest?" + objToString(params);
  return fetch(url).then(res => res.json());
};

export const getList = () =>
  fetch("https://www.mxnzp.com/api/music/recommend/list").then(res =>
    res.json()
  );

export const getJokes = params =>
  fetch(
    "https://www.mxnzp.com/api/jokes/list?" + objToString(params)
  ).then(res => res.json());
