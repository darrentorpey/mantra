class EBF.DefenderBullet extends Bullet
  constructor: (game, @options) ->
    super game

    @setOptions
      radial_distance: 0
      angle:           @options.angle
      speed:           200
      explodeWhen:     Mantra.Timer.after(@, { milliseconds: 1250 })

    _.defaults @options,
      size: 4

    @shotFrom      = { x: @options.x, y: @options.y }
    @firedAt       = Date.now()
    @radial_offset = @options.radial_offset

  draw: (context) ->
    Mantra.Canvas.rectangle context,
      x: @x, y: @y, w: @options.size, h: @options.size
      style:  'rgba(240, 240, 240, 1)'

    Mantra.Canvas.rectangle context, x: @x + 1, y: @y - 1, w: 2, h: 2, style:  'white'
    Mantra.Canvas.rectangle context, x: @x + 1, y: @y + @options.size/2 + 1, w: 2, h: 2, style:  'white'
    Mantra.Canvas.rectangle context, x: @x + @options.size/2 + 2, y: @y + 1, w: 1, h: 2, style:  'white'
    Mantra.Canvas.rectangle context, x: @x - 1, y: @y + 1, w: 1, h: 2, style:  'white'

  move: ->
    starting_distance = @radial_offset + @radial_distance
    @x = @shotFrom.x + (starting_distance * Math.cos(@angle))
    @y = @shotFrom.y + (starting_distance * Math.sin(@angle))
    @radial_distance += @speed * @game.clock_tick;
