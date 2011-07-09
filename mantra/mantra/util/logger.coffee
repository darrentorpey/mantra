class Mantra.Logger
  @instance: ->
    @singleton ?= new Mantra.Logger

  @level_map:
    debug: 4
    info:  3
    warn:  2
    error: 1
    off:   0

  constructor: (@log_levels = {}) -> null

  subsystems: (subsystems...) ->
    @registerSubsystem(system) for system in subsystems

  registerSubsystem: (name) ->
    @[name] = {
      debug: (message) => @log "[#{name}] #{message}" if Mantra.Logger.level_map[@log_levels[name]] >= Mantra.Logger.level_map['debug']
      info:  (message) => @log "[#{name}] #{message}" if Mantra.Logger.level_map[@log_levels[name]] >= Mantra.Logger.level_map['info']
      warn:  (message) => @log "[#{name}] #{message}" if Mantra.Logger.level_map[@log_levels[name]] >= Mantra.Logger.level_map['warn']
      error: (message) => @log "[#{name}] #{message}" if Mantra.Logger.level_map[@log_levels[name]] >= Mantra.Logger.level_map['error']
    }

  log: (message) ->
    console.log message

  levels: (@log_levels) ->
    null