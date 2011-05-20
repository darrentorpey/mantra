var Entity;
Entity = (function() {
  function Entity(game, sprite, coords) {
    this.game = game;
    this.sprite = sprite;
    if (coords == null) {
      coords = {
        x: 0,
        y: 0
      };
    }
    this.x = coords.x;
    this.y = coords.y;
    this.remove_from_world = false;
  }
  Entity.prototype.update = function() {
    return null;
  };
  Entity.prototype.draw = function(context) {
    if (this.game.showOutlines && this.radius) {
      context.beginPath();
      context.strokeStyle = 'green';
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.stroke();
      return context.closePath();
    }
  };
  Entity.prototype.drawSpriteCentered = function(context) {
    var x, y;
    x = this.x - this.sprite.width / 2;
    y = this.y - this.sprite.height / 2;
    return context.drawImage(this.sprite, x, y);
  };
  Entity.prototype.drawSpriteCenteredRotated = function(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle + Math.PI / 2);
    context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
    return context.restore();
  };
  Entity.prototype.rotateAndCache = function(image) {
    var offscreenCanvas, offscreenCtx, size;
    offscreenCanvas = document.createElement('canvas');
    size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(this.angle + Math.PI / 2);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    return offscreenCanvas;
  };
  Entity.prototype.outsideScreen = function() {
    return this.x > this.game.halfSurfaceWidth || this.x < -this.game.halfSurfaceWidth || this.y > this.game.halfSurfaceHeight || this.y < -this.game.halfSurfaceHeight;
  };
  Entity.prototype.listen = function(type, callback) {
    return EventManager.instance.listen(type, this, callback);
  };
  Entity.prototype.s_coords = function() {
    return "" + (this.x.toString().slice(0, 6)) + ", " + (this.y.toString().slice(0, 6));
  };
  return Entity;
})();