class Actor
  constructor: (@game, @sprite, coords = { x: 0, y: 0 }) ->
    @x = coords.x
    @y = coords.y
    @is_alive = true
    @remove_from_world = false

    Actor.count++
    # console.log "[new] Actor [#{Actor.count}]"
    gb.addEntity this

  # Prototype properties
  breed: -> new Actor if @is_alive
  die: ->
    Actor.count-- if @is_alive
    @is_alive = false

  update: ->
    null

  draw: (context) ->
    if @showOutlines && @radius
      context.beginPath();
      context.strokeStyle = "green";
      context.arc(@x, @y, @radius, 0, Math.PI*2, false);
      context.stroke();
      context.closePath();

  drawSpriteCentered: (ctx) ->
    # console.log 'drawSpriteCentered'
    x = @x - @sprite.width/2
    y = @y - @sprite.height/2
    # ctx.drawImage @sprite, x, y
    gb.context.drawImage(@sprite, x, y)

  drawSpriteCenteredRotated: (context) ->
    context.save()
    context.translate @x, @y
    context.rotate @angle + Math.PI/2
    context.drawImage @sprite, -@sprite.width/2, -@sprite.height/2
    context.restore()

  # Class-level properties
  @count: 0
  @makeTrouble: ->
    console.log "@count #{@count}"
    # console.log ('I am an actor!' for i in [1..@count]).join(' ')

class SpaceShip extends Actor
  enjoy: ->
    console.log 'enjoying...'