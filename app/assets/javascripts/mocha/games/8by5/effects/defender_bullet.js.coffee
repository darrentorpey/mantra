class DefenderBullet extends Bullet
  constructor: (game, @options) ->
    super game, {
      radial_distance: 0
      angle:           @options.angle
      speed:           250
      explodeOn:      ->
        (Date.now() - @shotAt) > 2000
    }

    _.defaults @options, {
      size: 4
    }

    @shotFrom = { x: @options.x, y: @options.y }
    @shotAt = Date.now()
    @radial_offset = @options.radial_offset

  draw: (context) ->
    Canvas.rectangle context, {
      x: @x, y: @y, w: @options.size, h: @options.size
      style:  'rgba(173, 216, 230, 0.9)'
    }

  move: ->
    starting_distance = @radial_offset + @radial_distance
    @x = @shotFrom.x + (starting_distance * Math.cos(@angle))
    @y = @shotFrom.y + (starting_distance * Math.sin(@angle))
    @radial_distance += @speed * @game.clock_tick;
