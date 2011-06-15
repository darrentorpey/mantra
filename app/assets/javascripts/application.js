//= require      underscore
//= require      jquery
//= require      jquery_ujs
//= require_tree ./lib
//= require      mantra
//= require      mantra/config
//= require_tree ./games

// require_tree ./mantra

var game_launcher, game;

function launchGame(game_name) {
  game_launcher = GameLauncher.launchInto(game_name, Canvas.j_createCanvas().appendTo('#game_holder').get(0))
  game = game_launcher.game;
}