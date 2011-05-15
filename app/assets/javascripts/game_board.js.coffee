class GameBoard
  constructor: (@canvas) ->
    @canvas ?= GameBoard.create_canvas()
    @context = @canvas.getContext '2d'
    @entities = [];
    @timer = new Timer

    @surfaceWidth = null;
    @surfaceHeight = null;
    @halfSurfaceWidth = null;
    @halfSurfaceHeight = null;
    @init()

  init: ->
    @surfaceWidth      = @canvas.width
    @surfaceHeight     = @canvas.height
    @halfSurfaceWidth  = @surfaceWidth/2
    @halfSurfaceHeight = @surfaceHeight/2
    @startInput()

  addEntity: (entity) ->
    @entities.push entity

  # Move coordinate system to center of canvas
  translate_to_center: ->  
    @context.translate @canvas.width/2, @canvas.height/2

  update: ->
    # Update every entity that isn't ready to be removed from the game world
    for entity in @entities
      entity.update() unless entity.remove_from_world

    # Remove the entities that are ready to be removed from the game world
    for i in [@entities.length - 1...0]
      @entities.splice i, 1 if @entities[i].remove_from_world

  draw: (callback) ->
    @context.clearRect 0, 0, @canvas.width, @canvas.height
    @context.save()
    @translate_to_center()

    for entity in @entities
      entity.draw @context

    callback(this) if callback

    @context.restore()

  loop: ->
    @clock_tick = @timer.tick()
    @update()
    @draw()
    @click = null

  start: ->
    console.log 'Starting game:'
    # var that = this;
    gameLoop = () =>
      @loop()
      requestAnimFrame gameLoop, @canvas
    gameLoop()

  startInput: ->
    getXandY = (e) =>
      x = e.clientX - @canvas.getBoundingClientRect().left - (@canvas.width/2)
      y = e.clientY - @canvas.getBoundingClientRect().top - (@canvas.height/2)
      { x: x, y: y }

    @canvas.addEventListener('click', (e) =>
      @click = getXandY(e)
      e.stopPropagation()
      e.preventDefault()
    , false)

    @canvas.addEventListener('mousemove', (e) =>
      @mouse = getXandY(e)
    , false)

  @create_canvas: ->
    $('<canvas>')
      .attr(
        id:     'game_surface'
        width:  '800'
        height: '600'
      )
      .css(
        'background-color': 'black'
        margin:             '0px auto'
        display:            'inline-block'
      )
      .prependTo('body')
      .get(0)

class EvilAliens extends GameBoard
  constructor: ->
    @lives = 10
    @score = 0
    super()

  start: ->
    @sentry = new Sentry this
    @earth = new Earth this
    super

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
