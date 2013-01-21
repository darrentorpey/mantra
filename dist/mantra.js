/*
 * 
 * 
 * -meta---
 * version:    
 * builddate:  2013-01-21T16:45:36.621Z
 * generator:  interleave@0.5.24
 * 
 * 
 * 
 */ 

// umdjs returnExports pattern: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root['mantra'] = factory();
    }
}(this, function () {
    steal
      .plugins('steal/coffee')
      .plugins('lib/jquery')
      .then('//lib/underscore', '//lib/base', function() {}, '//lib/machine', '//lib/shims', '//lib/soundmanager2', '//lib/js-finite-state-machine', '//lib/helpers')
      .plugins('mantra/util')
      .then(function() {})
      .plugins('mantra/entities')
      .plugins('mantra/levels')
      .then('events/event_manager.coffee')
      .then('effects/bullet.coffee')
      .then('core/game.coffee')
      .then('controls/keyboard.coffee')
      .then('config.coffee')
      .plugins('games')
      .then(function() {
    
    var game_launcher;
    
    function launchGame(game_name) {
      game_launcher = GameLauncher.launchInto(game_name, Mantra.Canvas.j_createCanvas().appendTo('#game_holder').get(0))
      game = game_launcher.game;
    }
    
    launchGame(eval(geturlparameter('game') ||'EightByFive'));
    
    });
    
    return typeof mantra != 'undefined' ? mantra : undefined;
}));