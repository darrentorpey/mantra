class EvilAliens extends Mantra.Game
  constructor: (@options = {}) ->
    super _.defaults @options,
      center_coordinates: true

      on_keypress:
        M: -> $audio_manager.toggle_mute()

      process_game_over: =>
        @showScreen 'game_lost'
        @bg_song.stop()

      defaultScreens: ['loading', 'pause']

      assets:
        images: [
          'earth.png'
          'alien.png'
          'sentry.png'
          'bullet-single.png'
          'explosion.png'
          'alien-explosion.png'
        ]

        sounds:
          'alien-boom'  : 'alien_boom.mp3'
          'bullet-boom' : 'bullet_boom.mp3'
          'bullet'      : 'bullet.mp3'

        music:
          'chaos' : 'countdown_to_chaos.mp3'

    @resetStats()

  guiPane: ->
    @ui_pane = new UIPane this

    @ui_pane.addTextItem
      x:    @canvas.width/2 - 150
      y:    @canvas.height/2 - 25
      text: -> "Health: #{@game.lives}"

    @ui_pane.addTextItem
      color: 'orange'
      x:     -@canvas.width/2 + 25
      y:      @canvas.height/2 - 25
      text:  -> "Score: #{@game.score}"

    @ui_pane

  start: ->
    @addScreen Screen.create @, 'intro'
      text: 'Defend Earth from the alien invasion!'

    @setScreens
      game: (screen) =>
        @background  = new Background @, { x: -@canvas.width/2, y: -@canvas.height/2 }
        @sentry      = new Sentry     @
        @earth       = new Earth      @
        @mothership  = new Mothership @
        screen.add @background, @sentry, @earth, @mothership

        @bg_song = AssetManager.getBackgroundSong('chaos')

        screen.onKeys
          P: =>
            @showScreen 'pause'
            @bg_song.pause()

        screen.add @guiPane()
        screen.add new GameWidget @, x: 100, y: -100
        screen.onStart = => @bg_song.play()

        screen

      game_lost:
        elements: =>
          intro_ui_pane = new UIPane this
          intro_ui_pane.addTextItem
            color: 'red'
            x:     'centered'
            y:     0
            text:  => "Game over!\nYour score was #{@score}.\nClick to restart."
          [intro_ui_pane]
        update: =>
          if @click
            @restart()
            @bg_song.restart()
            @showScreen 'game'

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
    @resetStats()

  resetStats: ->
    @lives = 10
    @score = 0

  getAliens:           -> ent for ent in @screens.game.entities when ent instanceof Alien
  getBullets:          -> ent for ent in @screens.game.entities when ent instanceof EarthBullet
  getBulletExplosions: -> ent for ent in @screens.game.entities when ent instanceof BulletExplosion

  configureEngine: ->
    # Levels, in increasing order of verbosity: off, error, warn, info, debug
    $logger.levels
      global: 'debug'
      sound:  'warn'
      assets: 'warn'
      input:  'warn'
      game:   'info'
