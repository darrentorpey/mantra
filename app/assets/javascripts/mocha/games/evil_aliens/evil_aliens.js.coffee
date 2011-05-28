class EvilAliens extends GameBoard
  @starting_lives = 10

  constructor: (@canvas) ->
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
        'alien-boom'  : 'alien_boom.mp3'
        'bullet-boom' : 'bullet_boom.mp3'
        'bullet'      : 'bullet.mp3'
      }
    }

    super @canvas

    @createLoadingScreen()
    @createPauseScreen()
    @createGameLostScreen()

    @process_game_over = ->
      @showScreen @game_lost_screen

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
        @showScreen @main_screen

    @addScreen @intro_screen

  createPauseScreen: ->
    @pause_screen = new Screen this, 'pause'
    pause_ui_pane = new UIPane this
    pause_ui_pane.addTextItem
      color: 'white'
      x:     'centered'
      y:     0
      text:  -> ':: Paused ::'

    @pause_screen.add pause_ui_pane

    @pause_screen.onKeys {
      p: => @showScreen @main_screen
    }

    @addScreen @pause_screen

  createMainScreen: ->
    @main_screen  = new Screen this, 'main'
    @main_screen.onUpdate = =>
      if !@last_alien_addded_at || (@timer.game_time - @last_alien_addded_at) > 1
        new_alien = new Alien this, @canvas.width/2 + 20, Math.random() * Math.PI * 180
        @main_screen.add new_alien
        @last_alien_addded_at = @timer.game_time
        $em.trigger 'alien::spawn', alien: new_alien

    @back        = new Background this, { x: -@canvas.width/2, y: -@canvas.height/2 }
    @sentry      = new Sentry     this
    @earth       = new Earth      this
    @stuff       = new EntitySet  this, @back, @sentry, @earth
    @main_screen.add @stuff

    @main_screen.onKeys {
      p: => @showScreen @pause_screen
    }

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
    @main_screen.add @ui_pane

    @addScreen @main_screen

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
        @showScreen @intro_screen

    @addScreen @loading_screen

  start: ->
    @createLoadingScreen()

    $em.listen 'alien::spawn', this, (data) ->
      # console.log "Alien incomming from #{data.alien.radial_distance}km away @ #{data.alien.angle}"

    $em.listen 'alien::death', this, (data) ->
      # console.log "Alien killed at #{data.alien.s_coords()}"
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
    ent for ent in @main_screen.entities when ent instanceof Bullet

  getBulletExplosions: ->
    ent for ent in @main_screen.entities when ent instanceof BulletExplosion