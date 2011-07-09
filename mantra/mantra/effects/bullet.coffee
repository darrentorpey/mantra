class Bullet extends Mantra.Entity
  constructor: (game, options) ->
    super game
    @setOptions options if options?

  setOptions: (options) ->
    [@x, @y]         = [options.x, options.y]
    @angle           = options.angle
    @speed           = options.speed           ?= 250
    @radial_distance = options.radial_distance ?= 95

    @explodesAt      = options.explodesAt
    @explode         = options.explode         if options.explode?

    _.defaults options,
      explodeWhen: ->
        Math.abs(@x) >= Math.abs(@explodesAt.x) || Math.abs(@y) >= Math.abs(@explodesAt.y)

    @explodeWhen     = options.explodeWhen

    @auto_cull       = options.auto_cull       ?= false

  update: ->
    return (@remove_from_world = true) if @auto_cull and @outsideScreen()
    return @explode() if @explodeWhen()

    @move()
    super()

  move: ->
    @x = @radial_distance * Math.cos(@angle)
    @y = @radial_distance * Math.sin(@angle)
    @radial_distance += @speed * @game.clock_tick;

  explode: ->
    @remove_from_world = true

root.Bullet = Bullet