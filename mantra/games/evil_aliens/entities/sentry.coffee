class Sentry extends SpriteEntity
  constructor: (game) ->
    @distanceFromEarthCenter = 85
    super game, AssetManager.getImage('sentry'), { x: 0, y: @distanceFromEarthCenter }
    @radius = @sprite.width / 2
    @angle = 0

  update: ->
    if @game.mouse
      @angle = Math.atan2 @game.mouse.y, @game.mouse.x
      @angle += Math.PI * 2 if @angle < 0
      @x = (Math.cos(@angle) * @distanceFromEarthCenter)
      @y = (Math.sin(@angle) * @distanceFromEarthCenter)

    @shoot() if @game.click && !Mantra.Geometry.withinCircle @game.earth, { x: @game.click.x, y: @game.click.y, radius: 1 }, buffer: 20

    super()

  draw: (context) ->
    context.save()
    context.translate @x, @y
    context.rotate    @angle + Math.PI/2
    context.drawImage @sprite, -@sprite.width/2, -@sprite.height/2
    context.restore()

    super context

  shoot: ->
    @game.screens.game.add new EarthBullet @game, @x, @y, @angle, @game.click
    AssetManager.getSound('s_bullet').play()

root.Sentry = Sentry