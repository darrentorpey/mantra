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

  start: ->
    @back   = new Background this, { x: -@canvas.width/2, y: -@canvas.height/2 }
    @sentry = new Sentry this
    @earth  = new Earth this
    @main_screen = new EntitySet @back, @sentry, @earth
    @addEntity @main_screen
    @ui_pane = new UIPane

    $em.listen 'alien::spawn', this, (data) ->
      console.log "Alien incomming from #{data.alien.radial_distance}km away @ #{data.alien.angle}"

    $em.listen 'alien::death', this, (data) ->
      console.log "Alien killed at #{data.alien.s_coords()}"

    super()

  update: ->
    if !@last_alien_addded_at || (@timer.game_time - @last_alien_addded_at) > 1
      new_alien = new Alien(this, @canvas.width/2 + 20, Math.random() * Math.PI * 180)
      @addEntity new_alien
      @last_alien_addded_at = @timer.game_time
      $em.trigger 'alien::spawn', alien: new_alien
    super()

  draw: ->
    super((game) ->
      game.drawScore()
      game.drawLives()
    )

  drawLives: ->
    @context.fillStyle = 'red'
    @context.font      = 'bold 2em Arial'
    @context.fillText "Lives: #{@lives}", @canvas.width/2 - 125, @canvas.height/2 - 25

  drawScore: ->
    @context.fillStyle = 'red'
    @context.font      = 'bold 2em Arial'
    @context.fillText "Score: #{@score}", -@canvas.width/2 + 25, @canvas.height/2 - 25
