class Entity
  constructor: (@game, @sprite, coords = { x: 0, y: 0 }) ->
    @x = coords.x
    @y = coords.y
    @remove_from_world = false

  update: -> null
  draw:   -> null
  cull:   -> null

  outsideScreen: ->
    (@x > @game.halfSurfaceWidth || @x < -(@game.halfSurfaceWidth) || @y > @game.halfSurfaceHeight || @y < -(@game.halfSurfaceHeight))

  listen: (type, callback) ->
    EventManager.instance.listen(type, this, callback)

  s_coords: ->
    "#{@x.toString()[0..5]}, #{@y.toString()[0..5]}"