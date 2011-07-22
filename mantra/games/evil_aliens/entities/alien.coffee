class Alien extends SpriteEntity
  constructor: (game, @radial_distance, @angle) ->
    super game, Sprite.rotateAndCache(AssetManager.getImage('alien'), @angle)
    @radius = @sprite.height/2
    @speed = 150
    @setCoords()

  update: ->
    @setCoords()
    @radial_distance -= @speed * @game.clock_tick

    if @hitPlanet()
      @remove_from_world = true
      $em.trigger 'alien::hit_planet', alien: this

    super()

  draw: (context) ->
    @drawSpriteCentered context
    super context

  setCoords: ->
    @x = @radial_distance * Math.cos(@angle)
    @y = @radial_distance * Math.sin(@angle)

  explode: ->
    @remove_from_world = true
    @game.screens.game.add new AlienExplosion @game, @x, @y
    AssetManager.getSound('alien-boom').play()
    $em.trigger 'alien::death', alien: this

  hitPlanet: ->
    distance_squared = ((@x * @x) + (@y * @y))
    radii_squared = (@radius + @game.earth.radius) * (@radius + @game.earth.radius)
    distance_squared < radii_squared

root.Alien = Alien  