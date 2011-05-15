# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
@gb
start_game = ->
  AssetManager.queueDownload '/assets/earth.png'
  AssetManager.queueDownload '/assets/alien.png'
  AssetManager.downloadAll init_gameboard

init_gameboard = ->
  console.log 'Initializing game board...'

  @gb = new GameBoard

  new Earth @gb
  new Alien @gb, @gb.canvas.width, Math.random() * Math.PI * 180

  console.log 'Game board initialized!'

  @gb.start()