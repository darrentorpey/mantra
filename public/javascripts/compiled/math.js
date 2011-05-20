Math.fib = function(n) {
  var s;
  s = 0;
  if (n === 0) {
    return s;
  }
  if (n === 1) {
    return s += 1;
  } else {
    return Math.fib(n - 1) + Math.fib(n - 2);
  }
};