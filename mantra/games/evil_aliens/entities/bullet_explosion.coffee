class BulletExplosion extends SpriteEntity
  constructor: (game, x, y) ->
    super game, null, { x: x, y: y }
    @animation = new Mantra.Animation AssetManager.getImage('explosion'), 34, 0.1
    @radius = @animation.frameWidth/2

  update: ->
    super()

    return @remove_from_world = true if @animation.isDone()

    @radius = @animation.frameWidth/2 * @scaleFactor()

    alien.explode() for alien in @game.getAliens() when @isCaughtInExplosion alien

  scaleFactor: -> 1 + (this.animation.currentFrame() / 3)

  draw: (context) ->
    @animation.drawFrame @game.clock_tick, context, @x, @y, @scaleFactor()
    super context

  isCaughtInExplosion: (alien) -> Mantra.Geometry.withinCircle @, alien

root.BulletExplosion = BulletExplosion