class Bullet extends Entity
  constructor: (game, options) ->
    [@x, @y]         = [options.x, options.y]
    @angle           = options.angle
    @explodesAt      = options.explodesAt
    @speed           = options.speed           ?= 250
    @radial_distance = options.radial_distance ?= 95
    @auto_cull       = options.auto_cull       ?= true

    @explode         = options.explode         if options.explode?
    @explodeOn       = options.explodeOn       ?= ->
      console.log 'def explodeOn'
      Math.abs(@x) >= Math.abs(@explodesAt.x) || Math.abs(@y) >= Math.abs(@explodesAt.y)

    super game

  update: ->
    # return (@remove_from_world = true) if @auto_cull and @outsideScreen()
    return @explode() if @explodeOn()
    @move()

  move: ->
    @x = @radial_distance * Math.cos(@angle)
    @y = @radial_distance * Math.sin(@angle)
    @radial_distance += @speed * @game.clock_tick;

  explode: ->
    @remove_from_world = true
