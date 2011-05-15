# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
@gb
start_game = ->
  AssetManager.queueDownload '/assets/earth.png'
  AssetManager.downloadAll init_gameboard

init_gameboard = ->
  console.log 'Initializing game board...'

  @x = 0
  @y = 0
  @sprite = AssetManager.getAsset('/assets/earth.png')

  @gb = new GameBoard
  @gb.translate_to_center()

  # draw image centered
  # @gb.context.drawImage(@sprite, @x - @sprite.width/2, @y - @sprite.height/2)

  # actor_1     = new Actor
  # actor_2     = new Actor
  # spaceship_1 = new SpaceShip
  # spaceship_1.enjoy()
  # 
  # Actor.makeTrouble()
  new Earth
  new Alien(@sprite)

  console.log 'Game board initialized!'

  @gb.start()