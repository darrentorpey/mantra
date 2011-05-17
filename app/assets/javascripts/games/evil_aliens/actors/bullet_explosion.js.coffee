class BulletExplosion extends Actor
  constructor: (game, x, y) ->
    super game, null, { x: x, y: y }
    @animation = new Animation AssetManager.getAsset('/assets/explosion.png'), 34, 0.1
    @radius = @animation.frameWidth/2

  update: ->
    super()

    if (@animation.isDone())
      @remove_from_world = true;
      return

    @radius = (@animation.frameWidth/2) * @scaleFactor()

    for alien in @game.entities
      if (alien instanceof Alien) && @isCaughtInExplosion(alien)
        @game.score += 10
        alien.explode()

  scaleFactor: ->
    1 + (this.animation.currentFrame() / 3)

  draw: (context) ->
    @animation.drawFrame @game.clock_tick, context, @x, @y, @scaleFactor()
    super context

  isCaughtInExplosion: (alien) ->
    distance_squared = ((@x - alien.x) * (@x - alien.x)) + ((@y - alien.y) * (@y - alien.y))
    radii_squared = (@radius + alien.radius) * (@radius + alien.radius)
    distance_squared < radii_squared
