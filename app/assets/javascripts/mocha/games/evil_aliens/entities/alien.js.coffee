class Alien extends Entity
  constructor: (game, @radial_distance, @angle) ->
    super game, @rotateAndCache(AssetManager.getAsset("#{root.asset_path}alien.png"), @angle)
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
    @game.main_screen.add new AlienExplosion @game, @x, @y
    AssetManager.getSound("#{root.asset_path}alien_boom.mp3").play()
    $em.trigger 'alien::death', alien: this

  hitPlanet: ->
    distance_squared = ((@x * @x) + (@y * @y))
    radii_squared = (@radius + Earth.RADIUS) * (@radius + Earth.RADIUS)
    distance_squared < radii_squared