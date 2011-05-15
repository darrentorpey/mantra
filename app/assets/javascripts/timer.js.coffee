class Timer
  constructor: ->
    @game_time           = 0
    @max_step            = 0.05
    @wall_last_timestamp = 0

  tick: ->
    wall_current          = Date.now()
    wall_delta            = (wall_current - @wall_last_timestamp) / 1000
    @wall_last_timestamp  = wall_current

    game_delta  = Math.min wall_delta, @max_step
    @game_time += game_delta
    game_delta
