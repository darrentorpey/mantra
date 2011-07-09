//= require      jquery
//= require      lib/underscore
//= require_tree ./lib
//= require      mantra
//= require_tree ./games

var game_launcher, game;

function launchGame(game_name) {
  game_launcher = GameLauncher.launchInto(game_name, Canvas.j_createCanvas().appendTo('#game_holder').get(0))
  game = game_launcher.game;
}