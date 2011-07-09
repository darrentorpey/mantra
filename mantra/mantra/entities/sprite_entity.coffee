class SpriteEntity extends Mantra.Entity
  constructor: (@game, @sprite, coords = { x: 0, y: 0 }) ->
    @setCoords coords
    @remove_from_world = false

  draw: (context) ->
    if @game.showOutlines && @radius
      context.beginPath();
      context.strokeStyle = 'green';
      context.arc @x, @y, @radius, 0, Math.PI*2, false
      context.stroke();
      context.closePath();

  drawSpriteCenteredRotated: (context) ->
    context.save()
    context.translate @x, @y
    context.rotate @angle + Math.PI/2
    context.drawImage @sprite, -@sprite.width/2, -@sprite.height/2
    context.restore()

root.SpriteEntity = SpriteEntity