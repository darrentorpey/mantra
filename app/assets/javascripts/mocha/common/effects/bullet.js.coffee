class Bullet extends Entity
  constructor: (game, options) ->
    [@x, @y]         = [options.x, options.y]
    @angle           = options.angle
    @explodesAt      = options.explodesAt
    @speed           = options.speed           ?= 250
    @radial_distance = options.radial_distance ?= 95
    @auto_cull       = options.auto_cull       ?= true

    super game

  update: ->
    if @auto_cull and @outsideScreen()
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
