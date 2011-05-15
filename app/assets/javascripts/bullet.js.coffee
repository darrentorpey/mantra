class Bullet extends Actor
  constructor: (game, x, y, @angle, @explodesAt) ->
    super game, @rotateAndCache(AssetManager.getAsset('/assets/bullet-single.png')), { x: x, y: y }
    @speed = 250
    @radial_distance = 95

  update: ->
    if @outsideScreen()
      @remove_from_world = true
    else if Math.abs(@x) >= Math.abs(@explodesAt.x) || Math.abs(@y) >= Math.abs(@explodesAt.y)
      @game.addEntity new BulletExplosion(@game, @explodesAt.x, @explodesAt.y)
      @remove_from_world = true
    else
      @x = @radial_distance * Math.cos(@angle)
      @y = @radial_distance * Math.sin(@angle)
      @radial_distance += @speed * @game.clock_tick;

  draw: (context) ->
    @drawSpriteCentered context
    super context
