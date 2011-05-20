var CustomDrawEntity;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
CustomDrawEntity = (function() {
  function CustomDrawEntity(game, position) {
    CustomDrawEntity.__super__.constructor.call(this, game, null, position);
  }
  __extends(CustomDrawEntity, Entity);
  return CustomDrawEntity;
})();