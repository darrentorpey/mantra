class Entity
  constructor: (@game, coords = { x: 0, y: 0 }) ->
    @x = coords.x
    @y = coords.y
    @remove_from_world = false

  update: -> null
  draw:   -> null
  cull:   -> null

  outsideScreen: ->
    if @game.center_coordinates
      (@x > @game.halfSurfaceWidth || @x < -(@game.halfSurfaceWidth) || @y > @game.halfSurfaceHeight || @y < -(@game.halfSurfaceHeight))
    else
      (@x > @game.canvas.width || @x < -(@game.canvas.width) || @y > @game.canvas.height || @y < -(@game.canvas.height))

  listen: (type, callback) ->
    EventManager.instance.listen(type, this, callback)

  s_coords: ->
    "#{@x.toString()[0..5]}, #{@y.toString()[0..5]}"

  drawSpriteCentered: (context) ->
    return unless @sprite?
    x = @x - @sprite.width/2
    y = @y - @sprite.height/2
    context.drawImage(@sprite, x, y)