# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
start_game = ->
  AssetManager.queueDownload '/assets/earth.png'
  AssetManager.queueDownload '/assets/alien.png'
  AssetManager.queueDownload '/assets/sentry.png'
  AssetManager.queueDownload '/assets/bullet-single.png'
  AssetManager.queueDownload '/assets/explosion.png'
  AssetManager.downloadAll   init_gameboard

init_gameboard = ->
  console.log 'Initializing game board...'
  @gb = new EvilAliens
  console.log 'Game board initialized!'

  @gb.start()