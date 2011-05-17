class Earth extends Actor
  @RADIUS = 67

  constructor: (game) ->
    super game, AssetManager.getAsset('/assets/earth.png')

  update: ->
    super()

  draw: (context) ->
    context.drawImage @sprite, @x - @sprite.width/2, @y - @sprite.height/2
    super context
