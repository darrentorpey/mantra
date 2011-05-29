class GameWidget extends Entity
  constructor: (game, @radius = 30) ->
    super game, null, 0
    @speed = 3

  update: ->
    @x -= @speed if keydown.left
    @x += @speed if keydown.right
    @y -= @speed if keydown.up
    @y += @speed if keydown.down

    alien.explode() for alien in @game.getAliens() when @isCaughtInField(alien)

    super()

  draw: (context) ->
    context.fillStyle = "rgba(200, 255, 255, .6)"
    context.beginPath()
    context.arc @x, @y, 30, 0, Math.PI*2, true
    context.closePath()
    context.fill()

    context.strokeStyle = "rgba(200, 255, 255, .8)"
    context.lineWidth = 2
    context.beginPath()
    context.arc @x, @y, 30, 0, Math.PI*2, true
    context.closePath()
    context.stroke()

    context.strokeStyle = "rgba(200, 255, 255, .9)"
    context.lineWidth = 2
    context.beginPath()
    context.arc @x, @y, 32, 0, Math.PI*2, true
    context.closePath()
    context.stroke()

    super context

  isCaughtInField: (alien) ->
    distance_squared = ((@x - alien.x) * (@x - alien.x)) + ((@y - alien.y) * (@y - alien.y))
    radii_squared = (@radius + alien.radius) * (@radius + alien.radius)
    distance_squared < radii_squared

  setCoords: (coords) ->
    @x = coords.x
    @y = coords.y