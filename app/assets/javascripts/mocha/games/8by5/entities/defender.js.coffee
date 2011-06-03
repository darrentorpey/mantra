class Defender extends SpriteEntity
  constructor: (game, @radius = 16) ->
    super game, null, 0
    @speed = 5

  update: ->
    Controls.moveByKeys.call @

  draw: (context) ->
    Canvas.circle context, {
      x: @x, y: @y, radius: @radius
      style:  'rgba(255, 170, 30, .8)'
    }

  setCoords: (coords) ->
    @x = coords.x
    @y = coords.y
