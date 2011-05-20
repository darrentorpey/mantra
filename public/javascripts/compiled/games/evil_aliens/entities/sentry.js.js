var Sentry;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Sentry = (function() {
  function Sentry(game) {
    this.distanceFromEarthCenter = 85;
    Sentry.__super__.constructor.call(this, game, AssetManager.getAsset("" + root.asset_path + "sentry.png"), {
      x: 0,
      y: this.distanceFromEarthCenter
    });
    this.radius = this.sprite.width / 2;
    this.angle = 0;
  }
  __extends(Sentry, Entity);
  Sentry.prototype.update = function() {
    if (this.game.mouse) {
      this.angle = Math.atan2(this.game.mouse.y, this.game.mouse.x);
      if (this.angle < 0) {
        this.angle += Math.PI * 2;
      }
      this.x = Math.cos(this.angle) * this.distanceFromEarthCenter;
      this.y = Math.sin(this.angle) * this.distanceFromEarthCenter;
    }
    if (this.game.click) {
      this.shoot();
    }
    return Sentry.__super__.update.call(this);
  };
  Sentry.prototype.draw = function(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle + Math.PI / 2);
    context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
    context.restore();
    return Sentry.__super__.draw.call(this, context);
  };
  Sentry.prototype.shoot = function() {
    var bullet;
    bullet = new Bullet(this.game, this.x, this.y, this.angle, this.game.click);
    this.game.addEntity(bullet);
    return AssetManager.getSound("" + root.asset_path + "bullet.mp3").play();
  };
  return Sentry;
})();