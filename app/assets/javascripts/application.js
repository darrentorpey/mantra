// FIXME: Tell people that this is a manifest file, real code should go into discrete files
// FIXME: Tell people how Sprockets and CoffeeScript works
//
//= require      jquery
//= require      jquery_ujs
//= require_tree ./common/util
//= require_tree ./common
//= require_tree ./games
//= require_tree .
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

soundManager.url = '/assets/';
soundManager.flashVersion = 9;
soundManager.debugFlash = false;
soundManager.debugMode = false;
soundManager.defaultOptions.volume = 33