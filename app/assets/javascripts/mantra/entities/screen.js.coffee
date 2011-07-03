# Mantra • Screen
# ---------------
#
# Screens are one of Mantra's most important core utilities...

class Screen extends EntitySet
  constructor: (@game, @name, @options = {}) ->
    @key_map = {}
    super @game

    @add (@options.elements())... if @options.elements
    @onUpdate = @options.update if @options.update

  add: (new_entities...) ->
    entity.screen = @ for entity in new_entities
    super new_entities...

  update: ->
    @onUpdate() if @onUpdate and !@paused
    super()

  turnOff: ->
    @hide()
    @pause()

  turnOn: ->
    if @been_shown
      @onResume()
    else
      @been_shown = true
      @onStart()

    @show()
    @unpause()

  onStart:  -> null
  onResume: -> null

  onKeys: (@key_map) -> null

  onKey: (key) ->
    @key_map[key]() if @key_map[key]

  @makeScreen: (screen_name, creator) -> new Screen this, screen_name, creator