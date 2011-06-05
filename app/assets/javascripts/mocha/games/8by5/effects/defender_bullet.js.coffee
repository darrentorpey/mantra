class DefenderBullet extends Bullet
  constructor: (game, x, y, @angle, @explodesAt) ->
    @speed = 250
    super game, {
      radial_distance: 95
      angle:           @angle
    }
    @sprite = Sprite.rotateAndCache(AssetManager.getAsset("#{root.asset_path}bullet-single.png"), @angle)

  update: ->
    if @outsideScreen()
      @remove_from_world = true
    else if Math.abs(@x) >= Math.abs(@explodesAt.x) || Math.abs(@y) >= Math.abs(@explodesAt.y)
      AssetManager.getSound("#{root.asset_path}bullet_boom.mp3").play()
      @game.main_screen.add new BulletExplosion(@game, @explodesAt.x, @explodesAt.y)
      @remove_from_world = true
    else
      @x = @radial_distance * Math.cos(@angle)
      @y = @radial_distance * Math.sin(@angle)
      @radial_distance += @speed * @game.clock_tick;

  draw: (context) ->
    @drawSpriteCentered context
    super context
