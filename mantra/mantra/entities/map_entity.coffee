class Mantra.MapEntity extends Mantra.Entity
  constructor: (game, @options) ->
    [@x, @y, @w, @h, @style] = [options.x, options.y, options.w, options.h, options.style]
    super game, { x: @x, y: @y }

  draw: (context) ->
    Mantra.Canvas.rectangle context,
      x: @x, y: @y, w: @w, h: @h
      style:  @style || 'rgba(173, 216, 230, 1.0)'

    Mantra.Canvas.rectangle context,
      x: @x + 1, y: @y + 1, w: @w - 2, h: @h - 2
      style:  'rgba(0, 0, 0, 0.5)'
      hollow: true
      borderWidth: 2

    Mantra.Canvas.rectangle context,
      x: @x + 5, y: @y + 5, w: @w - 10, h: @h - 10
      hollow: true
      borderWidth: 2

  setCoords: (coords) ->
    @x = coords.x
    @y = coords.y
