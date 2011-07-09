steal.plugins("lib/jquery").then("lib/underscore").plugins("lib").then("mantra.coffee", "mantra/config.coffee").plugins("games").then(function() {
//= require      jquery
//= require      jquery_ujs
//= require      lib/underscore
//= require_tree ./lib
//= require      mantra
//= require      mantra/config
//= require_tree ./games

var game_launcher, game;

function launchGame(game_name) {
  game_launcher = GameLauncher.launchInto(game_name, Canvas.j_createCanvas().appendTo('#game_holder').get(0))
  game = game_launcher.game;
}

});
