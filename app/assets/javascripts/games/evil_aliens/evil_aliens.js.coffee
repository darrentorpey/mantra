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

    super()

  update: ->
    if !@last_alien_addded_at || (@timer.game_time - @last_alien_addded_at) > 1
      @addEntity new Alien(this, @canvas.width, Math.random() * Math.PI * 180)
      @last_alien_addded_at = @timer.game_time
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
