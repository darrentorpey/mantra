//= require      underscore
//= require      jquery
//= require      jquery_ujs
//= require_tree ./lib
//= require      mocha/common/util/core
//= require_tree ./mocha/common/util
//= require      mocha/common/entities/entity
//= require      mocha/common/entities/sprite_entity
//= require_tree ./mocha/common
//= require_tree ./mocha/games
//= require      mocha/config
//= require_tree ./mocha
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var game_launcher, game;

function launchGame(game_name) {
  game_launcher = GameLauncher.launchInto(game_name, Canvas.j_createCanvas().appendTo('#game_holder').get(0))
  game = game_launcher.game;
}