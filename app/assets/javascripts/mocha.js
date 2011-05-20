//= require      mocha/common/util/core
//= require_tree ./mocha/common/util
//= require      mocha/common/entities/entity
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