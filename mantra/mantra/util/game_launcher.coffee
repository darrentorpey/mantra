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

    Mantra.KeyManager.capture_keypresses @game

    @game.init()

    @addImage image     for image in assets.images
    @addSound id, sound for id, sound of assets.sounds
    @addSound id, music for id, music of assets.music

  configureEngine: ->
    root.$em            = Mantra.EventManager.instance()
    root.$logger        = Mantra.Logger.instance()
    root.$audio_manager = Mantra.AudioManager.instance()

    $logger.subsystems 'global', 'sound', 'assets', 'input', 'game'

    @game.configureEngine()

  launch: ->
    AssetManager.downloadAll (=> @start())

  start: ->
    console.log 'Assets loaded. Launching game...'
    console.log @game.state.current_state
    @game.start() if @game.state.current_state == 'initialized'

  addImage: (name)     -> AssetManager.queueImage     "#{root.asset_path}#{name}"
  addSound: (id, name) -> AssetManager.queueSound id, "#{root.asset_path}#{name}"

  @launchInto: (game_klass, canvas) ->
    @launcher = new GameLauncher game_klass, canvas
    @launcher.init()
    @launcher.launch()
    @launcher

  @launch: (game_klass) ->
    @launchInto game_klass

root.GameLauncher = GameLauncher