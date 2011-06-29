class ScreenMaker
  @create: (game, preset_name, options = {}) ->
    _.defaults options, {
      firstScreen: 'game'
      name:        preset_name
    }

    presets = switch preset_name
      when 'intro'
        {
          addText: (screen) ->
            intro_ui_pane = new UIPane game
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
            ui_pane = new UIPane game
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
            ui_pane = new UIPane game
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

    screen = new Screen game, options.name

    options.addText screen if options.addText
    screen.onKeys options.onKeys if options.onKeys

    screen.onUpdate = options.onUpdate

    screen