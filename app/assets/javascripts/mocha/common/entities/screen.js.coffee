class Screen extends EntitySet
  update: ->
    @onUpdate() if @onUpdate and !@paused
    super()

  turnOff: ->
    @hide()
    @pause()

  turnOn: ->
    @show()
    @unpause()