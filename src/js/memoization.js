const memoizeUtil = func => {
  // results store
  const cache = {};
  return input => {
    // return the value if it exists in the cache object
    // otherwise, compute the input with the passed in function and
    // update the collection object with the input as the key and
    // computed result as the value to that key
    // End result will be key-value pairs stored inside cache
    const _cache = cache[input] || (cache[input] = func(input));
    console.log(cache);
    return _cache;
  };
};

const findFactorial = memoizeUtil(factorial);
function factorial(num) {
  // termination case
  if (num < 0) {
    throw new Error("Number must be positive.");
  }
  // base case
  if (num === 0 || num === 1) {
    return 1;
  }
  // recursive case
  return num * findFactorial(num - 1);
}

// findFactorial(2); // 2
// findFactorial(3); // 6
// findFactorial(6); // 720

console.time("factorial test no memo");
findFactorial(6); // 720
console.timeEnd("factorial test no memo");

console.time("factorial test with memo");
findFactorial(6); // 720
console.timeEnd("factorial test with memo");
