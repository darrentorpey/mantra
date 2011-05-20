var Earth;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Earth = (function() {
  Earth.RADIUS = 67;
  __extends(Earth, Entity);
  function Earth(game) {
    Earth.__super__.constructor.call(this, game, AssetManager.getAsset("" + root.asset_path + "earth.png"));
  }
  Earth.prototype.update = function() {
    return Earth.__super__.update.call(this);
  };
  Earth.prototype.draw = function(context) {
    context.drawImage(this.sprite, this.x - this.sprite.width / 2, this.y - this.sprite.height / 2);
    return Earth.__super__.draw.call(this, context);
  };
  return Earth;
})();