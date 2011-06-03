class EightByFive extends GameBoard
  constructor: (@options = {}) ->
    @canvas = @options.canvas
    @assets {
      images: ['alien.png']
    }

    super @options

    @setScreens {
      loading: (screen) =>
        @loading_ui_pane = new UIPane this

        @loading_ui_pane.addTextItem
          color: 'orange'
          x:     'centered'
          y:     0
          text:  -> "Loading... #{AssetManager.getProgress()}%"

        screen.add @loading_ui_pane

        screen.onUpdate = =>
          if @state.current_state != 'initialized' && AssetManager.isDone()
            @showScreen 'intro'

        screen

      main: (screen) =>
        screen.onUpdate = =>
          console.log 'main'

        @defender = new Defender this
        @defender.setCoords x: -200, y: -200
        screen.add @defender

        screen.onKeys
          P: =>
            @showScreen 'pause'
            # @bg_song.pause()

        screen

      intro: (screen) =>
        intro_ui_pane = new UIPane this
        intro_ui_pane.addTextItem
          color: 'orange'
          x:     'centered'
          y:     0
          text:  -> 'Click to start!'

        screen.add intro_ui_pane
        screen.onUpdate = =>
          console.log 'intro'
          if @click
            # @bg_song.play()
            @showScreen 'main'

        screen

      pause: (screen) =>
        pause_ui_pane = new UIPane this
        pause_ui_pane.addTextItem
          color: 'white'
          x:     'centered'
          y:     0
          text:  -> ':: paused ::'

        screen.add pause_ui_pane

        screen.onKeys {
          P: =>
            @showScreen 'main'
            # @bg_song.resume()
        }
        
        screen
    }
