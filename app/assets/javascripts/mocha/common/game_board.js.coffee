class GameBoard
  constructor: (@canvas) ->
    @canvas  ?= Canvas.create_canvas()
    @context  = @canvas.getContext '2d'
    @entities = []
    @timer    = new Timer
    @screens  = []
    @key_map  = {}
    @process_game_over = -> null
    @state    = new FSM 'initialized', { name: 'initialized' }
    @state.add_transition 'start', 'initialized', null,                      'started'
    @state.add_transition 'lose',  'started',     (=> @process_game_over()), 'game_lost'
    @state.add_transition 'restart', ['started', 'game_won', 'game_lost'], null, 'started'

    @surfaceWidth      = null
    @surfaceHeight     = null
    @halfSurfaceWidth  = null
    @halfSurfaceHeight = null

  init: ->
    @surfaceWidth      = @canvas.width
    @surfaceHeight     = @canvas.height
    @halfSurfaceWidth  = @surfaceWidth/2
    @halfSurfaceHeight = @surfaceHeight/2

    @startInput()

  addEntity: (new_entities...) ->
    @entities.push entity for entity in new_entities

  # Move coordinate system to center of canvas
  translate_to_center: ->  
    @context.translate @canvas.width/2, @canvas.height/2

  update: ->
    # Update every entity that isn't ready to be removed from the game world
    entity.update() for entity in @entities when !entity.remove_from_world
    entity.cull()   for entity in @entities

    # Remove the entities that are ready to be removed from the game world
    @entities.splice i, 1 for i in [@entities.length - 1...0] when @entities[i].remove_from_world

  draw: (callback) ->
    @context.clearRect 0, 0, @canvas.width, @canvas.height
    @context.save()
    @translate_to_center()

    entity.draw @context for entity in @entities

    callback this if callback

    @context.restore()

  loop: ->
    @clock_tick = @timer.tick()
    @update()
    @draw()
    @click = null

  start: ->
    @showScreen @currentScreen

    gameLoop = () =>
      @loop()
      requestAnimFrame gameLoop, @canvas
    gameLoop()

    @state.send_event 'start'

  onKeys: (@key_map) -> null

  onKey: (key) ->
    @key_map[key]() if @key_map[key]
    @currentScreen.onKey key if @currentScreen

  showScreen: (screen) ->
    i_screen.turnOff() for i_screen in @screens
    screen.turnOn()
    @currentScreen = screen

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

  addScreen: (screen) ->
    @screens.push screen
    @addEntity screen
    @currentScreen ?= screen
