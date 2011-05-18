class GameLauncher
  constructor: (game_name, @canvas) ->
    @game = new game_name @canvas

  init: ->
    console.log 'Queueing up assets to load...'

    @image 'earth.png'
    @image 'alien.png'
    @image 'sentry.png'
    @image 'bullet-single.png'
    @image 'explosion.png'
    @image 'alien-explosion.png'

    @sound 'alien-boom',  'alien_boom.mp3'
    @sound 'bullet-boom', 'bullet_boom.mp3'
    @sound 'bullet',      'bullet.mp3'

  launch: ->
    AssetManager.downloadAll (=> @start())

  start: ->
    console.log 'Assets loaded. Launching game...'
    @game.start()

  image: (name)     -> AssetManager.queueImage     "/assets/#{name}"
  sound: (id, name) -> AssetManager.queueSound id, "/assets/#{name}"

  @launchInto: (game_klass, canvas) ->
    @launcher = new GameLauncher game_klass, canvas
    @launcher.init()
    @launcher.launch()
    @launcher

  @launch: (game_klass) ->
    @launchInto game_klass