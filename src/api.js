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
