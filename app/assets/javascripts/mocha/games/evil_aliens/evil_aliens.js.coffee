class EvilAliens extends GameBoard
  constructor: (@canvas) ->
    @lives = 10
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

  createIntroScreen: ->
    @intro_screen = new Screen this
    @intro_ui_pane = new UIPane this

    @intro_ui_pane.addTextItem
      color: 'orange'
      x:     'centered'
      y:     0
      text:  -> 'Click to start!'

    @intro_screen.add @intro_ui_pane
    @intro_screen.onUpdate = =>
      if @click
        @createMainScreen()
        @showScreen @mainScreen

    @addScreen @intro_screen

  createMainScreen: ->
    @mainScreen  = new Screen this
    @mainScreen.onUpdate = =>
      if !@last_alien_addded_at || (@timer.game_time - @last_alien_addded_at) > 1
        new_alien = new Alien this, @canvas.width/2 + 20, Math.random() * Math.PI * 180
        @mainScreen.add new_alien
        @last_alien_addded_at = @timer.game_time
        $em.trigger 'alien::spawn', alien: new_alien

    @back        = new Background this, { x: -@canvas.width/2, y: -@canvas.height/2 }
    @sentry      = new Sentry     this
    @earth       = new Earth      this
    @stuff       = new EntitySet  this, @back, @sentry, @earth
    @mainScreen.add @stuff

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
    @mainScreen.add @ui_pane

    @addScreen @mainScreen

  createLoadingScreen: ->
    @loading_screen = new Screen this
    @loading_ui_pane = new UIPane this

    @loading_ui_pane.addTextItem
      color: 'orange'
      x:     'centered'
      y:     0
      text:  -> "Loading... #{AssetManager.getProgress()}%"

    @loading_screen.add @loading_ui_pane

    @loading_screen.onUpdate = =>
      # console.log "Loading... #{5}%"
      if @state != '' && AssetManager.isDone()
        @createIntroScreen()
        @showScreen @intro_screen

    @addScreen @loading_screen

  start: ->
    @createLoadingScreen()

    $em.listen 'alien::spawn', this, (data) -> console.log "Alien incomming from #{data.alien.radial_distance}km away @ #{data.alien.angle}"

    $em.listen 'alien::death', this, (data) -> console.log "Alien killed at #{data.alien.s_coords()}"

    super()
