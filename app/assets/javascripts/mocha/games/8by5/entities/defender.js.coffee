class Defender extends Entity
  constructor: (game, @radius = 16) ->
    super game, null, 0
    @speed = 5

  update: ->
    Controls.moveByKeys.call @
    @shoot() if @game.click

  draw: (context) ->
    Canvas.circle context, {
      x: @x, y: @y, radius: @radius
      style:  'rgba(255, 170, 30, .8)'
    }

  setCoords: (coords) ->
    @x = coords.x
    @y = coords.y

  shoot: ->
    @game.main_screen.add new DefenderBullet @game, {
      x:             @x
      y:             @y
      angle:         Math.atan2 @game.mouse.y - @y, @game.mouse.x - @x
      radial_offset: @radius
    }
