let index = 1;
let _cache = [];
function state() {
  const currentIndex = index;
  function setState(newState) {
    _cache[currentIndex] = newState;
    index = 0;
    console.log("index-currentIndex", index, currentIndex);
  }
  return [_cache[index++], setState];
}
const [data, setData] = state();
// setData();
// setData();
