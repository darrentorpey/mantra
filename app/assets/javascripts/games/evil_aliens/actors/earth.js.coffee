class Earth extends Actor
  constructor: (game) ->
    super game, AssetManager.getAsset('/assets/earth.png')

  update: ->
    super()

  draw: (ctx) ->
    gb.context.drawImage(@sprite, @x - @sprite.width/2, @y - @sprite.height/2)
    super ctx

  @RADIUS = 67