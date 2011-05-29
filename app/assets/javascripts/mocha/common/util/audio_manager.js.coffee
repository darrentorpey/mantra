class AudioManager
  @instance: ->
    @singleton ?= new AudioManager

  constructor: ->
    @muted = false

  toggle_mute: ->
    if @muted
      $logger.log 'unmuting'
    else
      $logger.log 'muting'
    @muted = !@muted
