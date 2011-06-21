class EvilAliens extends Mantra.Game
  @starting_lives = 10

  constructor: (@options = {}) ->
    @canvas = @options.canvas
    @lives = EvilAliens.starting_lives
    @score = 0
    @assets = {
      images: [
        'earth.png'
        'alien.png'
        'sentry.png'
        'bullet-single.png'
        'explosion.png'
        'alien-explosion.png'
      ]
      sounds: {
        'alien-boom'   : 'alien_boom.mp3'
        'bullet-boom'  : 'bullet_boom.mp3'
        'bullet'       : 'bullet.mp3'
      }
      music: {
        'bulldozer'    : 'rampaging_bulldozer-freesoundtrackmusic.mp3'
      }
    }

    @center_coordinates = true

    super @options

    @createLoadingScreen()
    @createPauseScreen()
    @createGameLostScreen()

    @onKeys
      M: => $audio_manager.toggle_mute()

    @process_game_over = ->
      @showScreen @game_lost_screen
      @bg_song.stop()

  createGameLostScreen: ->
    @game_lost_screen = new Screen this, 'lost'
    intro_ui_pane = new UIPane this
    intro_ui_pane.addTextItem
      color: 'red'
      x:     'centered'
      y:     0
      text:  => "Game over!\nYour score was #{@score}.\nClick to restart."

    @game_lost_screen.add intro_ui_pane
    @game_lost_screen.onUpdate = =>
      if @click
        @restart()
        @bg_song.restart()
        @showScreen @main_screen

    @addScreen @game_lost_screen

  createIntroScreen: ->
    @intro_screen = new Screen this, 'intro'
    intro_ui_pane = new UIPane this
    intro_ui_pane.addTextItem
      color: 'orange'
      x:     'centered'
      y:     0
      text:  -> 'Click to start!'

    @intro_screen.add intro_ui_pane
    @intro_screen.onUpdate = =>
      if @click
        @createMainScreen()
        @bg_song.play()
        @showScreen @main_screen

    @addScreen @intro_screen

  createPauseScreen: ->
    @pause_screen = new Screen this, 'pause'
    pause_ui_pane = new UIPane this
    pause_ui_pane.addTextItem
      color: 'white'
      x:     'centered'
      y:     0
      text:  -> ':: paused ::'

    @pause_screen.add pause_ui_pane

    @pause_screen.onKeys {
      P: =>
        @showScreen @main_screen
        @bg_song.resume()
    }

    @addScreen @pause_screen

  createMainScreen: ->
    @main_screen  = new Screen this, 'game'

    @back        = new Background this, { x: -@canvas.width/2, y: -@canvas.height/2 }
    @sentry      = new Sentry     this
    @earth       = new Earth      this
    @mothership  = new Mothership this
    @stuff       = new EntitySet  this, @back, @sentry, @earth, @mothership
    @main_screen.add @stuff

    @main_screen.onKeys
      P: =>
        @showScreen @pause_screen
        @bg_song.pause()

    @main_screen.add @gui_pane()
    @main_screen.add @game_widget()

    @bg_song = AssetManager.getBackgroundSong('bulldozer')

    @addScreen @main_screen

  gui_pane: ->
    @ui_pane = new UIPane this

    @ui_pane.addTextItem
      x:    @canvas.width/2 - 125
      y:    @canvas.height/2 - 25
      text: -> "Lives: #{@game.lives}"

    @ui_pane.addTextItem
      color: 'orange'
      x:     -@canvas.width/2 + 25
      y:      @canvas.height/2 - 25
      text:  -> "Score: #{@game.score}"

    @ui_pane

  game_widget: ->
    @game_widget = new GameWidget this
    @game_widget.setCoords x: -200, y: -200
    @game_widget

  createLoadingScreen: ->
    @loading_screen = new Screen this, 'loading'
    @loading_ui_pane = new UIPane this

    @loading_ui_pane.addTextItem
      color: 'orange'
      x:     'centered'
      y:     0
      text:  -> "Loading... #{AssetManager.getProgress()}%"

    @loading_screen.add @loading_ui_pane

    @loading_screen.onUpdate = =>
      if @state.current_state != 'initialized' && AssetManager.isDone()
        @createIntroScreen()
        @showScreen 'intro'

    @addScreen @loading_screen

  start: ->
    @createLoadingScreen()

    $em.listen 'alien::death', this, (data) ->
      $logger.game.info "Alien killed at #{data.alien.s_coords()}"
      @score += 10

    $em.listen 'alien::hit_planet', this, (date) ->
      @lives -= 1
      @state.send_event 'lose' if @lives == 0

    super()

  restart: ->
    @state.send_event 'restart'
    ent.remove_from_world = true for ent in @getAliens()
    ent.remove_from_world = true for ent in @getBullets()
    ent.remove_from_world = true for ent in @getBulletExplosions()
    @lives = EvilAliens.starting_lives
    @score = 0

  getAliens: ->
    alien for alien in @main_screen.entities when alien instanceof Alien

  getBullets: ->
    ent for ent in @main_screen.entities when ent instanceof EarthBullet

  getBulletExplosions: ->
    ent for ent in @main_screen.entities when ent instanceof BulletExplosion

  configureEngine: ->
    # Levels, in increasing order of verbosity: off, error, warn, info, debug
    $logger.levels {
      global: 'debug'
      sound:  'warn'
      assets: 'info'
      input:  'info'
      game:   'info'
    }