class Earth extends SpriteEntity
  constructor: (game) ->
    super game, AssetManager.getAsset("#{game.image_path}earth.png")
    @radius = 67

  draw: (context) ->
    context.drawImage @sprite, @x - @sprite.width/2, @y - @sprite.height/2
    super context

root.Earth = Earth