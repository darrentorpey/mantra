# Mantra • Screen
# ---------------
#
# Screens are one of Mantra's most important core utilities...

class Mantra.Screen extends EntitySet
  constructor: (@game, @name, @options = {}) ->
    @key_map = {}
    super @game

    @add (@options.elements())... if @options.elements
    console.log '@name', @name
    console.log 'done adding elements', @name
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

  @makeScreen: (screen_name, creator) ->
    switch typeof creator
      when 'function' then creator(new Mantra.Screen this, screen_name)
      when 'object'   then new Mantra.Screen this, screen_name, creator

  @create: (game, preset_name, options = {}) ->
    _.defaults options, {
      firstScreen: 'game'
      name:        preset_name
    }

    presets = switch preset_name
      when 'intro'
        {
          addText: (screen) ->
            intro_ui_pane = new Mantra.UIPane game
            intro_ui_pane.addTextItem
              color: 'orange'
              x:     'centered'
              y:     'centered'
              text:  -> options.text || 'Click to start!'
            screen.add intro_ui_pane
          onUpdate: =>
            game.showScreen options.firstScreen if game.click
        }
      when 'loading'
        {
          addText: (screen) ->
            ui_pane = new Mantra.UIPane game
            ui_pane.addTextItem
              color: 'orange'
              x:     'centered'
              y:     'centered'
              text:  -> "Loading... #{AssetManager.getProgress()}%"
            screen.add ui_pane
          onUpdate: =>
            game.showScreen 'intro' if game.state.current_state != 'initialized' && AssetManager.isDone()
        }
      when 'pause'
        {
          addText: (screen) ->
            ui_pane = new Mantra.UIPane game
            ui_pane.addTextItem
              color: 'white'
              x:     'centered'
              y:     'centered'
              text:  -> ':: paused ::'
            screen.add ui_pane
          onKeys: {
            P: =>
              game.showScreen options.gameScreen || 'game'
              game.bg_song.resume() if game.bg_song
          }
        }
      else {}

    _.defaults options, presets

    screen = new Mantra.Screen game, options.name

    options.addText screen if options.addText
    screen.onKeys options.onKeys if options.onKeys

    screen.onUpdate = options.onUpdate

    screen