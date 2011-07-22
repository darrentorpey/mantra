class AlienExplosion extends SpriteEntity
  constructor: (game, x, y) ->
    super game, null, { x: x, y: y }
    @animation = new Mantra.Animation AssetManager.getImage('alien_explosion'), 69, 0.1
    @radius = @animation.frameWidth/2

  update: ->
    super()
    @remove_from_world = true if @animation.isDone()

  draw: (context) ->
    @animation.drawFrame @game.clock_tick, context, @x, @y
    super context

root.AlienExplosion = AlienExplosion