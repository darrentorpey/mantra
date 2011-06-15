//= require      underscore
//= require      jquery
//= require      jquery_ujs
//= require_tree ./lib
//= require      mantra/common/util/core
//= require_tree ./mantra/common/util
//= require      mantra/common/entities/entity
//= require      mantra/common/entities/sprite_entity
//= require_tree ./mantra/common
//= require_tree ./mantra/games
//= require      mantra/config
//= require_tree ./mantra
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