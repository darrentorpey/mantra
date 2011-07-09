class Mantra.AudioManager
  @instance: ->
    @singleton ?= new Mantra.AudioManager

  constructor: ->
    @muted = false

  toggle_mute: ->
    if @muted
      $logger.log 'unmuting'
    else
      $logger.log 'muting'
    @muted = !@muted
