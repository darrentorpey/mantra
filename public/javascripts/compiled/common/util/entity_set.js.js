var EntitySet;
var __slice = Array.prototype.slice;
EntitySet = (function() {
  function EntitySet() {
    var entities;
    entities = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this.entities = entities;
    this.visible = true;
    this.paused = false;
  }
  EntitySet.prototype.add = function() {
    var entity, new_entities, _i, _len, _results;
    new_entities = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_i = 0, _len = new_entities.length; _i < _len; _i++) {
      entity = new_entities[_i];
      _results.push(this.entities.push(entity));
    }
    return _results;
  };
  EntitySet.prototype.update = function() {
    var entity, _i, _len, _ref, _results;
    if (!this.paused) {
      _ref = this.entities;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        _results.push(entity.update());
      }
      return _results;
    }
  };
  EntitySet.prototype.draw = function(context) {
    var entity, _i, _len, _ref, _results;
    if (this.visible) {
      _ref = this.entities;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        _results.push(entity.draw(context));
      }
      return _results;
    }
  };
  return EntitySet;
})();