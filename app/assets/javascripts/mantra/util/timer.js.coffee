class Timer
  constructor: ->
    @time_passed         = 0
    @first_tick          = undefined
    @max_step            = 0.05
    @wall_last_timestamp = 0

  tick: ->
    wall_current          = Date.now()
    @first_tick          ?= wall_current
    wall_delta            = (wall_current - @wall_last_timestamp) / 1000
    @wall_last_timestamp  = wall_current

    game_delta  = Math.min wall_delta, @max_step
    @time_passed += game_delta
    game_delta

  @after: (obj, options = {}) ->
    timer = new Timer()
    obj.addTimer timer
    options.seconds = options.milliseconds/1000 if options.milliseconds?
    -> timer.time_passed > options.seconds