var Bullet;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Bullet = (function() {
  function Bullet(game, x, y, angle, explodesAt) {
    this.angle = angle;
    this.explodesAt = explodesAt;
    Bullet.__super__.constructor.call(this, game, this.rotateAndCache(AssetManager.getAsset("" + root.asset_path + "bullet-single.png")), {
      x: x,
      y: y
    });
    this.speed = 250;
    this.radial_distance = 95;
  }
  __extends(Bullet, Entity);
  Bullet.prototype.update = function() {
    if (this.outsideScreen()) {
      return this.remove_from_world = true;
    } else if (Math.abs(this.x) >= Math.abs(this.explodesAt.x) || Math.abs(this.y) >= Math.abs(this.explodesAt.y)) {
      AssetManager.getSound("" + root.asset_path + "bullet_boom.mp3").play();
      this.game.addEntity(new BulletExplosion(this.game, this.explodesAt.x, this.explodesAt.y));
      return this.remove_from_world = true;
    } else {
      this.x = this.radial_distance * Math.cos(this.angle);
      this.y = this.radial_distance * Math.sin(this.angle);
      return this.radial_distance += this.speed * this.game.clock_tick;
    }
  };
  Bullet.prototype.draw = function(context) {
    this.drawSpriteCentered(context);
    return Bullet.__super__.draw.call(this, context);
  };
  return Bullet;
})();