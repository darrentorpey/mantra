class MapEntity extends Entity
  constructor: (game, @options) ->
    [@x, @y, @w, @h, @style] = [options.x, options.y, options.w, options.h, options.style]
    super game, { x: @x, y: @y }

  draw: (context) ->
    Canvas.rectangle context, {
      x: @x, y: @y, w: @w, h: @h
      style:  @style || 'rgba(173, 216, 230, 1.0)'
    }
    Canvas.rectangle context, {
      x: @x, y: @y, w: @w, h: @h
      style:  'rgba(0, 0, 0, 0.4)'
      # style:  'rgba(0, 112, 138, 1.0)'
      hollow: true
      borderWidth: 3
    }

  setCoords: (coords) ->
    @x = coords.x
    @y = coords.y
