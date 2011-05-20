var AssetManager;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
AssetManager = (function() {
  function AssetManager() {
    this.AssetManager = __bind(this.AssetManager, this);;
  }
  AssetManager.successCount = 0;
  AssetManager.errorCount = 0;
  AssetManager.cache = {};
  AssetManager.downloadQueue = [];
  AssetManager.soundsQueue = [];
  AssetManager.queueImage = function(path) {
    return this.downloadQueue.push(path);
  };
  AssetManager.queueSound = function(id, path) {
    return this.soundsQueue.push({
      id: id,
      path: path
    });
  };
  AssetManager.isDone = function() {
    return (this.downloadQueue.length + this.soundsQueue.length) === (this.successCount + this.errorCount);
  };
  AssetManager.downloadAll = function(callback) {
    var i, _ref, _results;
    if (this.downloadQueue.length === 0 && this.soundsQueue.length === 0) {
      callback();
    }
    this.downloadSounds(callback);
    _results = [];
    for (i = 0, _ref = this.downloadQueue.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      this.path = this.downloadQueue[i];
      this.img = new Image();
      this.img.addEventListener('load', __bind(function() {
        this.successCount += 1;
        if (this.isDone()) {
          return callback();
        }
      }, this));
      this.img.addEventListener('error', __bind(function() {
        this.errorCount += 1;
        if (this.isDone()) {
          return callback();
        }
      }, this));
      this.img.src = this.path;
      _results.push(this.cache[this.path] = this.img);
    }
    return _results;
  };
  AssetManager.getAsset = function(name) {
    return this.cache[name];
  };
  AssetManager.getSound = function(path) {
    return this.cache[path];
  };
  AssetManager.downloadSounds = function(callback) {};
  AssetManager.downloadSound = function(id, path, callback) {
    var manager;
    manager = this;
    return this.cache[path] = soundManager.createSound({
      id: id,
      autoLoad: true,
      url: path,
      onload: function() {
        if (this.debug_all) {
          console.log(this.url + ("" + this.url + " is loaded"));
        }
        manager.successCount += 1;
        if (manager.isDone()) {
          return callback();
        }
      }
    });
  };
  return AssetManager;
})();