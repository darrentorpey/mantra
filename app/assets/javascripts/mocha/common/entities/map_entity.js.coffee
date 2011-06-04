class MapEntity extends Entity
  constructor: (game, @options) ->
    [@x, @y, @w, @h, @style] = [options.x, options.y, options.w, options.h, options.style]
    super game, { x: @x, y: @y }

  draw: (context) ->
    Canvas.rectangle context, {
      x: @x, y: @y, w: @w, h: @h
      style:  @style || 'rgba(173, 216, 230, 0.9)'
    }

  setCoords: (coords) ->
    @x = coords.x
    @y = coords.y
