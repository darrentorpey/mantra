class DefenderBullet extends Bullet
  constructor: (game, @options) ->
    super game,
      radial_distance: 0
      angle:           @options.angle
      speed:           250
      explodeWhen:     ->
        (Date.now() - @firedAt) > 2000

    _.defaults @options,
      size: 4

    @shotFrom      = { x: @options.x, y: @options.y }
    @firedAt       = Date.now()
    @radial_offset = @options.radial_offset

  draw: (context) ->
    Canvas.rectangle context,
      x: @x, y: @y, w: @options.size, h: @options.size
      style:  'rgba(240, 240, 240, 1)'

  move: ->
    starting_distance = @radial_offset + @radial_distance
    @x = @shotFrom.x + (starting_distance * Math.cos(@angle))
    @y = @shotFrom.y + (starting_distance * Math.sin(@angle))
    @radial_distance += @speed * @game.clock_tick;
