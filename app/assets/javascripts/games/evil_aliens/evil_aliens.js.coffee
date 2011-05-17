class EvilAliens extends GameBoard
  constructor: ->
    @lives = 10
    @score = 0
    super()

  start: ->
    console.log 'EvilAliens start...'
    console.log @
    @sentry = new Sentry this
    @earth = new Earth this
    @addEntity @sentry
    @addEntity @earth
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
    @context.fillText "Lives: #{@lives}", -@canvas.width/2 + 50, @canvas.height/2 - 80

  drawScore: ->
    @context.fillStyle = 'red'
    @context.font      = 'bold 2em Arial'
    @context.fillText "Score: #{@score}", -@canvas.width/2 + 50, @canvas.height/2 - 50
