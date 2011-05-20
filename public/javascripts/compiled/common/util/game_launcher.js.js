var GameLauncher;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
GameLauncher = (function() {
  function GameLauncher(game_name, canvas) {
    this.canvas = canvas;
    this.game = new game_name(this.canvas);
  }
  GameLauncher.prototype.init = function(assets) {
    var id, image, sound, _i, _len, _ref, _ref2, _ref3, _ref4, _results;
    if (assets == null) {
      assets = this.game.assets;
    }
    console.log('Queueing up assets to load...');
        if ((_ref = assets.images) != null) {
      _ref;
    } else {
      assets.images = [];
    };
        if ((_ref2 = assets.sounds) != null) {
      _ref2;
    } else {
      assets.sounds = [];
    };
    _ref3 = assets.images;
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      image = _ref3[_i];
      this.addImage(image);
    }
    _ref4 = assets.sounds;
    _results = [];
    for (id in _ref4) {
      sound = _ref4[id];
      _results.push(this.addSound(id, sound));
    }
    return _results;
  };
  GameLauncher.prototype.launch = function() {
    return AssetManager.downloadAll((__bind(function() {
      return this.start();
    }, this)));
  };
  GameLauncher.prototype.start = function() {
    console.log('Assets loaded. Launching game...');
    return this.game.start();
  };
  GameLauncher.prototype.addImage = function(name) {
    return AssetManager.queueImage("" + root.asset_path + name);
  };
  GameLauncher.prototype.addSound = function(id, name) {
    return AssetManager.queueSound(id, "" + root.asset_path + name);
  };
  GameLauncher.launchInto = function(game_klass, canvas) {
    this.launcher = new GameLauncher(game_klass, canvas);
    this.launcher.init();
    this.launcher.launch();
    return this.launcher;
  };
  GameLauncher.launch = function(game_klass) {
    return this.launchInto(game_klass);
  };
  return GameLauncher;
})();