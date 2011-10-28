define [
  'jquery/jquery-1.6.2'
  'jquery/jquery.hotkeys'
  'underscore'
  'base'
  'machine'
  'shims'
  'js-finite-state-machine'
  'helpers'
  'cs!../mantra/util/util'
  'cs!../mantra/entities/entities'
  # 'regular'
], (jquery, jquery_hotkeys) ->
  # controller.attach view
  # console.log 'regular name is: ' + jquery
  console.log 'Mantra is loaded!'
  # doit()
  # console.log 'over'

# doit = ->
#   define [ 'cs!../mantra/entities/entities' ], (it) ->
#     console.log 'it it'

# steal
#   .plugins('steal/coffee')
#   .plugins('lib/jquery')
#   .then('//lib/underscore', '//lib/base', function() {}, '//lib/machine', '//lib/shims', '//lib/js-finite-state-machine', '//lib/helpers')
#   .plugins('mantra/util')
#   .then(function() {})
#   .plugins('mantra/entities')
#   .plugins('mantra/levels')
#   .then('events/event_manager.coffee')
#   .then('effects/bullet.coffee')
#   .then('core/game.coffee')
#   .then('controls/keyboard.coffee')
#   .then('config.coffee')
#   .plugins('games')
#   .then(function() {
# 
# var game_launcher;
# 
# function launchGame(game_name) {
#   game_launcher = GameLauncher.launchInto(game_name, Mantra.Canvas.j_createCanvas().appendTo('#game_holder').get(0))
#   game = game_launcher.game;
# }
# 
# launchGame(eval(geturlparameter('game') ||'EightByFive'));
# 
# });
