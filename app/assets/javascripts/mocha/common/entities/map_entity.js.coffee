class MapEntity extends Entity
  constructor: (game, @options) ->
    [@x, @y, @w, @h] = [options.x, options.y, options.w, options.h]
    super game, { x: @x, y: @y }

  draw: (context) ->
    Canvas.rectangle context, {
      x: @x, y: @y, w: @w, h: @h
      style:  'rgba(173, 216, 230, 0.9)'
    }

  setCoords: (coords) ->
    @x = coords.x
    @y = coords.y
