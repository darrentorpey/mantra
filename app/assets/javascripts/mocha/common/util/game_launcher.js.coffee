class GameLauncher
  constructor: (game_name, @canvas) ->
    @game = new game_name @canvas

  init: (assets = @game.assets) ->
    console.log 'Queueing up assets to load...'

    assets.images ?= []
    assets.sounds ?= []

    @addImage image for image in assets.images
    @addSound id, sound for id, sound of assets.sounds

  launch: ->
    AssetManager.downloadAll (=> @start())

  start: ->
    console.log 'Assets loaded. Launching game...'
    @game.start()

  addImage: (name)     -> AssetManager.queueImage     "#{root.asset_path}#{name}"
  addSound: (id, name) -> AssetManager.queueSound id, "#{root.asset_path}#{name}"

  @launchInto: (game_klass, canvas) ->
    @launcher = new GameLauncher game_klass, canvas
    @launcher.init()
    @launcher.launch()
    @launcher

  @launch: (game_klass) ->
    @launchInto game_klass