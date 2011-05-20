(function() {
  describe('Alien:', function() {
    return describe('fib()', function() {
      return it('should work', function() {
        var alien;
        AssetManager.getAsset('alien.png');
        AssetManager.downloadAll();
        return alien = new Alien;
      });
    });
  });
}).call(this);
