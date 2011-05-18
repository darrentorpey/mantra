class Sentry extends Entity
  constructor: (game) ->
    @distanceFromEarthCenter = 85
    super game, AssetManager.getAsset("#{root.asset_path}sentry.png"), { x: 0, y: @distanceFromEarthCenter }
    @radius = @sprite.width / 2
    @angle = 0

  update: ->
    if @game.mouse
      @angle = Math.atan2 @game.mouse.y, @game.mouse.x
      @angle += Math.PI * 2 if @angle < 0
      @x = (Math.cos(@angle) * @distanceFromEarthCenter)
      @y = (Math.sin(@angle) * @distanceFromEarthCenter)

    @shoot() if @game.click

    super()

  draw: (context) ->
    context.save()
    context.translate @x, @y
    context.rotate    @angle + Math.PI/2
    context.drawImage @sprite, -@sprite.width/2, -@sprite.height/2
    context.restore()

    super context

  shoot: ->
    bullet = new Bullet @game, @x, @y, @angle, @game.click
    @game.addEntity bullet
    AssetManager.getSound("#{root.asset_path}bullet.mp3").play()