class Defender extends Entity
  constructor: (game, @radius = 16) ->
    super game, null, 0
    @speed = 5
    @colw = 32
    @colh = 32
    @colx = 16
    @coly = 16

  update: ->
    Controls.moveByKeys.call @
    @shoot() if @game.click

    @game.map.tileCollision @

  draw: (context) ->
    Canvas.circle context, {
      x: @x, y: @y, radius: @radius
      style:  'rgba(100, 200, 20, .8)'
    }

    # Draw the collision box
    # Canvas.rectangle context, {
    #   x: @x - @colx, y: @y - @coly, w: @radius * 2, h: @radius * 2
    #   style:  'rgba(273, 216, 230, 0.9)'
    # }

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
