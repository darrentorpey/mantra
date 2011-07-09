class EarthBullet extends Bullet
  constructor: (game, x, y, @angle, @explodesAt) ->
    super game, {
      radial_distance: 95
      angle:           @angle
      explodesAt:      explodesAt
      speed:           250
    }

    @sprite = Sprite.rotateAndCache(AssetManager.getAsset("#{root.asset_path}bullet-single.png"), @angle)

  draw: (context) ->
    @drawSpriteCentered context
    super context

  explode: ->
    AssetManager.getSound("#{root.asset_path}bullet_boom.mp3").play()
    @game.screens.game.add new BulletExplosion(@game, @explodesAt.x, @explodesAt.y)
    super()

  draw: (context) ->
    @drawSpriteCentered context
    super context

root.EarthBullet = EarthBullet