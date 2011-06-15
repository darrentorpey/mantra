class GameLauncher
  constructor: (game_name, @canvas) ->
    @game = new game_name {
      canvas: @canvas
    }

  init: (assets = @game.assets) ->
    console.log 'Queueing up assets to load...'

    assets.images ?= []
    assets.sounds ?= []

    @configureEngine()

    console.log 'Initializing game...'
    $logger.assets.debug "# assets: #{assets.images.length}"

    @game.init()
    @game.start() if @game.currentScreen

    KeyManager.capture_keypresses @game

    @addImage image     for image in assets.images
    @addSound id, sound for id, sound of assets.sounds
    @addSound id, music for id, music of assets.music

  configureEngine: ->
    root.$em            = EventManager.instance()
    root.$logger        = Logger.instance()
    root.$audio_manager = AudioManager.instance()

    $logger.subsystems 'global', 'sound', 'assets', 'input', 'game'

    @game.configureEngine()

  launch: ->
    AssetManager.downloadAll (=> @start())

  start: ->
    console.log 'Assets loaded. Launching game...'
    @game.start() if @game.state == ''

  addImage: (name)     -> AssetManager.queueImage     "#{root.asset_path}#{name}"
  addSound: (id, name) -> AssetManager.queueSound id, "#{root.asset_path}#{name}"

  @launchInto: (game_klass, canvas) ->
    @launcher = new GameLauncher game_klass, canvas
    @launcher.init()
    @launcher.launch()
    @launcher

  @launch: (game_klass) ->
    @launchInto game_klass