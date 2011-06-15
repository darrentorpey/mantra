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
    # console.log @game.clock_tick%20 * 1000
    # console.log @game.timer

    # it = !((@game.clock_tick * 1000)%35)
    # console.log it
    # if it
    #   Map.tileCollision @, @game.map_def, @game.map_presence
    #   console.log "top: #{@touchedup} | right: #{@touchedright} | bottom: #{@toucheddown} | left: #{@touchedleft}" if @touchedup || @touchedright || @toucheddown || @touchedlef  

    Map.tileCollision @, @game.map_def, @game.map_presence

  draw: (context) ->
    Canvas.circle context, {
      x: @x, y: @y, radius: @radius
      style:  'rgba(255, 170, 30, .8)'
    }

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
