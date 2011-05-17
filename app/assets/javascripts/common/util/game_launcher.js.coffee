class GameLauncher
  constructor: (@game_klass) ->

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
    AssetManager.downloadAll @start

  start: ->
    console.log 'this'
    console.log @
    console.log EvilAliens
    console.log @game_klass
    @gb = new EvilAliens
    # @gb = new @game_klass
    console.log 'Game board initialized!'
    @gb.init()
    @gb.start()

  queueAsset: (name) -> AssetManager.queueImage "/assets/#{name}"
  queueSound: (id, name) -> AssetManager.queueSound id, "/assets/#{name}"