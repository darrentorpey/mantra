var BulletExplosion;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BulletExplosion = (function() {
  function BulletExplosion(game, x, y) {
    BulletExplosion.__super__.constructor.call(this, game, null, {
      x: x,
      y: y
    });
    this.animation = new Animation(AssetManager.getAsset("" + root.asset_path + "explosion.png"), 34, 0.1);
    this.radius = this.animation.frameWidth / 2;
  }
  __extends(BulletExplosion, Entity);
  BulletExplosion.prototype.update = function() {
    var alien, _i, _len, _ref, _results;
    BulletExplosion.__super__.update.call(this);
    if (this.animation.isDone()) {
      this.remove_from_world = true;
      return;
    }
    this.radius = (this.animation.frameWidth / 2) * this.scaleFactor();
    _ref = this.game.entities;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      alien = _ref[_i];
      _results.push((alien instanceof Alien) && this.isCaughtInExplosion(alien) ? (this.game.score += 10, alien.explode()) : void 0);
    }
    return _results;
  };
  BulletExplosion.prototype.scaleFactor = function() {
    return 1 + (this.animation.currentFrame() / 3);
  };
  BulletExplosion.prototype.draw = function(context) {
    this.animation.drawFrame(this.game.clock_tick, context, this.x, this.y, this.scaleFactor());
    return BulletExplosion.__super__.draw.call(this, context);
  };
  BulletExplosion.prototype.isCaughtInExplosion = function(alien) {
    var distance_squared, radii_squared;
    distance_squared = ((this.x - alien.x) * (this.x - alien.x)) + ((this.y - alien.y) * (this.y - alien.y));
    radii_squared = (this.radius + alien.radius) * (this.radius + alien.radius);
    return distance_squared < radii_squared;
  };
  return BulletExplosion;
})();