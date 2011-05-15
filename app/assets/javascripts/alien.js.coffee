class Alien extends Actor
  constructor: (game, @radial_distance, @angle) ->
    super game, AssetManager.getAsset('/assets/alien.png')
    @radius = @sprite.height/2
    @speed = 0.3
    @setCoords()
    # console.log "coords: #{@x}, #{@y} [#{@angle}]"

  update: ->
    @setCoords()
    @radial_distance -= @speed * @game.deltaTime
    super()

  draw: (context) ->
    @drawSpriteCentered context
    super context

  setCoords: ->
    @x = @radial_distance * Math.cos(@angle)
    @y = @radial_distance * Math.sin(@angle)
