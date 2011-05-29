class GameWidget extends Entity
  constructor: (game) ->
    super game, @rotateAndCache(AssetManager.getAsset("#{root.asset_path}alien.png"), 0)
    @speed = 2

  update: ->
    @x -= @speed if keydown.left
    @x += @speed if keydown.right
    @y -= @speed if keydown.up
    @y += @speed if keydown.down
    super()

  draw: (context) ->
    @drawSpriteCentered context
    super context

  setCoords: (coords) ->
    @x = coords.x
    @y = coords.y
