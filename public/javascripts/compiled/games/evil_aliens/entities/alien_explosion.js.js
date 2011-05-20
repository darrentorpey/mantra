var AlienExplosion;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
AlienExplosion = (function() {
  function AlienExplosion(game, x, y) {
    AlienExplosion.__super__.constructor.call(this, game, null, {
      x: x,
      y: y
    });
    this.animation = new Animation(AssetManager.getAsset("" + root.asset_path + "alien-explosion.png"), 69, 0.1);
    this.radius = this.animation.frameWidth / 2;
  }
  __extends(AlienExplosion, Entity);
  AlienExplosion.prototype.update = function() {
    AlienExplosion.__super__.update.call(this);
    if (this.animation.isDone()) {
      return this.remove_from_world = true;
    }
  };
  AlienExplosion.prototype.draw = function(context) {
    this.animation.drawFrame(this.game.clock_tick, context, this.x, this.y);
    return AlienExplosion.__super__.draw.call(this, context);
  };
  return AlienExplosion;
})();