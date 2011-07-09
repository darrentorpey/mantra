class Mantra.Timer
  constructor: ->
    @time_passed     = 0
    @max_step        = 0.05
    @last_timestamp  = 0

  tick: ->
    current_timestamp  = Date.now()
    time_delta         = (current_timestamp - @last_timestamp) / 1000
    walled_time_delta  = Math.min time_delta, @max_step

    @last_timestamp    = current_timestamp
    @time_passed      += walled_time_delta

    walled_time_delta

  @after: (obj, options = {}) ->
    timer = new Mantra.Timer()
    obj.addTimer timer
    options.seconds = options.milliseconds/1000 if options.milliseconds?
    -> timer.time_passed > options.seconds