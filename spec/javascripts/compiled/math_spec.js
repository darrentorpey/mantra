(function() {
  describe('Math:', function() {
    return describe('fib()', function() {
      return it('should calculate the numbers correctly up to fib(16)', function() {
        var fib, i, _results;
        fib = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];
        _results = [];
        for (i = 0; i <= 16; i++) {
          _results.push(expect(Math.fib(i)).toEqual(fib[i]));
        }
        return _results;
      });
    });
  });
}).call(this);
