var Alien;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Alien = (function() {
  function Alien(game, radial_distance, angle) {
    this.radial_distance = radial_distance;
    this.angle = angle;
    Alien.__super__.constructor.call(this, game, this.rotateAndCache(AssetManager.getAsset("" + root.asset_path + "alien.png")));
    this.radius = this.sprite.height / 2;
    this.speed = 150;
    this.setCoords();
  }
  __extends(Alien, Entity);
  Alien.prototype.update = function() {
    this.setCoords();
    this.radial_distance -= this.speed * this.game.clock_tick;
    if (this.hitPlanet()) {
      this.remove_from_world = true;
      this.game.lives -= 1;
    }
    return Alien.__super__.update.call(this);
  };
  Alien.prototype.draw = function(context) {
    this.drawSpriteCentered(context);
    return Alien.__super__.draw.call(this, context);
  };
  Alien.prototype.setCoords = function() {
    this.x = this.radial_distance * Math.cos(this.angle);
    return this.y = this.radial_distance * Math.sin(this.angle);
  };
  Alien.prototype.explode = function() {
    this.remove_from_world = true;
    this.game.addEntity(new AlienExplosion(this.game, this.x, this.y));
    AssetManager.getSound("" + root.asset_path + "alien_boom.mp3").play();
    return $em.trigger('alien::death', {
      alien: this
    });
  };
  Alien.prototype.hitPlanet = function() {
    var distance_squared, radii_squared;
    distance_squared = (this.x * this.x) + (this.y * this.y);
    radii_squared = (this.radius + Earth.RADIUS) * (this.radius + Earth.RADIUS);
    return distance_squared < radii_squared;
  };
  return Alien;
})();