class Screen extends EntitySet
  constructor: (@game, @name) ->
    @key_map = {}
    super @game

  update: ->
    @onUpdate() if @onUpdate and !@paused
    super()

  turnOff: ->
    @hide()
    @pause()

  turnOn: ->
    @show()
    @unpause()

  onKeys: (@key_map) ->
    null

  onKey: (key) ->
    # console.log "'#{key}' pressed"
    # console.log !!@key_map[key]
    @key_map[key]() if @key_map[key]