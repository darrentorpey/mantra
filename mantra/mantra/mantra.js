steal
  .plugins('steal/coffee')
  .plugins('lib/jquery')
  .then('//lib/underscore', '//lib/base', function() {}, '//lib/machine', '//lib/shims', '//lib/soundmanager2', '//lib/js-finite-state-machine')
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

var game_launcher, game;

function launchGame(game_name) {
  game_launcher = GameLauncher.launchInto(game_name, Mantra.Canvas.j_createCanvas().appendTo('#game_holder').get(0))
  game = game_launcher.game;
}

// launchGame(EightByFive);
launchGame(EvilAliens);

});
