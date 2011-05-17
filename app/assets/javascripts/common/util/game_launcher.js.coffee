class GameLauncher
  constructor: (game_name, @canvas) ->
    @game = new game_name @canvas

  init: ->
    console.log 'Initializing game board...'
    @queueAsset 'earth.png'
    @queueAsset 'alien.png'
    @queueAsset 'sentry.png'
    @queueAsset 'bullet-single.png'
    @queueAsset 'explosion.png'
    @queueAsset 'alien-explosion.png'

    @queueSound 'alien-boom',  'alien_boom.mp3'
    @queueSound 'bullet-boom', 'bullet_boom.mp3'
    @queueSound 'bullet',      'bullet.mp3'

  launch: ->
    AssetManager.downloadAll (=> @start())

  start: ->
    console.log 'Game launched! Starting...'
    console.log '@game'
    console.log @game
    # @gb = new @game_klass
    @game.start()

  queueAsset: (name)     -> AssetManager.queueImage     "/assets/#{name}"
  queueSound: (id, name) -> AssetManager.queueSound id, "/assets/#{name}"

  @launchInto: (game_klass, canvas) ->
    console.log  canvas
    @launcher = new GameLauncher game_klass, canvas
    @launcher.init()
    @launcher.launch()

  @launch: (game_klass) ->
    @launchInto game_klass