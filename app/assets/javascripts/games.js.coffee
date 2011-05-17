# start_game = ->
#   @queueAsset 'earth.png'
#   @queueAsset 'alien.png'
#   @queueAsset 'sentry.png'
#   @queueAsset 'bullet-single.png'
#   @queueAsset 'explosion.png'
#   @queueAsset 'alien-explosion.png'
# 
#   @queueSound 'alien-boom',  'alien_boom.mp3'
#   @queueSound 'bullet-boom', 'bullet_boom.mp3'
#   @queueSound 'bullet',      'bullet.mp3'
# 
#   AssetManager.downloadAll   init_gameboard
# 
# init_gameboard = ->
#   console.log 'Initializing game board...'
#   @gb = new EvilAliens
#   @gb.init()
#   console.log 'Game board initialized!'
#   @gb.start()
# 
# queueAsset = (name) -> AssetManager.queueImage "/assets/#{name}"
# queueSound = (id, name) -> AssetManager.queueSound id, "/assets/#{name}
# 
@gl
@gb
start_game = ->
  @gb = new EvilAliens
  @gl = new GameLauncher(@gb)
  # console.log 'hihijij'
  # console.log @gl
  @gl.init()
  @gl.launch()
  # console.log 'Initializing game board...'
  # @gb = new EvilAliens
  # @gb.init()
  # console.log 'Game board initialized!'
  # @gb.start()