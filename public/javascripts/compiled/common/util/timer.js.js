var Timer;
Timer = (function() {
  function Timer() {
    this.game_time = 0;
    this.max_step = 0.05;
    this.wall_last_timestamp = 0;
  }
  Timer.prototype.tick = function() {
    var game_delta, wall_current, wall_delta;
    wall_current = Date.now();
    wall_delta = (wall_current - this.wall_last_timestamp) / 1000;
    this.wall_last_timestamp = wall_current;
    game_delta = Math.min(wall_delta, this.max_step);
    this.game_time += game_delta;
    return game_delta;
  };
  return Timer;
})();