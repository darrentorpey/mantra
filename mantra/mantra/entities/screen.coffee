# Mantra • Screen
# ---------------
#
# Screens are one of Mantra's most important core utilities...

class Mantra.Screen extends EntitySet
  @presets:
    'intro':
      panes: (options) ->
        intro_ui_pane = new Mantra.UIPane @game
        intro_ui_pane.addTextItem
          color: 'orange'
          x:     'centered'
          y:     'centered'
          text:  -> (if (typeof options.text is 'function') then options.text.call(@game) else options.text) || 'Click to start!'
        [intro_ui_pane]
      onUpdate: ->
        @showScreen 'game' if @click

    'loading':
      panes: (options) ->
        ui_pane = new Mantra.UIPane @game
        ui_pane.addTextItem
          color: 'orange'
          x:     'centered'
          y:     'centered'
          text:  -> "Loading... #{AssetManager.getProgress()}%"
        [ui_pane]
      onUpdate: ->
        # console.log @
        # console.log @state.current_state
        @showScreen 'intro' if @state.current_state != 'initialized' && AssetManager.isDone()

    'pause':
      panes: (options) ->
        ui_pane = new Mantra.UIPane @game
        ui_pane.addTextItem
          color: 'white'
          x:     'centered'
          y:     'centered'
          text:  -> ':: paused ::'
        [ui_pane]
      on_keys:
        P: ->
          @game.showScreen @options.gameScreen || 'game'
          @game.bg_song.resume() if @game.bg_song

  constructor: (@game, @name, @options = {}) ->
    @key_map = {}
    super @game

    # If a preset is specified, we'll first load the preset's settings for this screen
    if @options.preset and preset = Mantra.Screen.presets[@options.preset]
      @add pane for pane in preset.panes.apply(@, [@options]) if preset.panes
      @onUpdate = preset.onUpdate if preset.onUpdate
      @addKeyMappings preset.on_keys if preset.on_keys

    @add (@options.elements.call(@game))... if @options.elements
    @onUpdate = @options.update if @options.update
    @addKeyMappings @options.on_keys if @options.on_keys

  add: (new_entities...) ->
    entity.screen = @ for entity in new_entities
    super new_entities...

  update: ->
    @onUpdate.call(@game) if @onUpdate and !@paused
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

  addKeyMappings: (key_mappings) -> _.extend @key_map, key_mappings

  onKey: (key) ->
    @key_map[key].apply @ if @key_map[key]
