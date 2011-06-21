class Mantra.Game
  constructor: (@options) ->
    @canvas  ?= Canvas.create_canvas()
    @context  = @canvas.getContext '2d'
    @entities = []
    @timer    = new Timer
    @screens  = {}
    @key_map  = {}

    _.defaults @options, {
      assets: {
        images: []
      }
    }

    @process_game_over = -> null
    @state    = new FSM 'initialized', { name: 'initialized' }
    @state.add_transition 'start', 'initialized', null,                      'started'
    @state.add_transition 'lose',  'started',     (=> @process_game_over()), 'game_lost'
    @state.add_transition 'restart', ['started', 'game_won', 'game_lost'], null, 'started'

    [@surfaceWidth, @surfaceHeight, @halfSurfaceWidth, @halfSurfaceHeight] = [null, null, null, null]

  assets:  (@assets)  -> null

  setScreens: (screens) ->
    for screen_name, creator of screens
      screen = new Screen this, screen_name
      @addScreen creator(screen)

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
    if @entities.length
      # Update every entity that isn't ready to be removed from the game world
      entity.update() for entity in @entities when !entity.remove_from_world

      # Cull out the entities that need it
      entity.cull()   for entity in @entities

      # Remove the entities that are ready to be removed from the game world
      @entities.splice i, 1 for i in [@entities.length - 1...0] when @entities[i].remove_from_world

  draw: (callback) ->
    @context.clearRect 0, 0, @canvas.width, @canvas.height
    @context.save()
    @translate_to_center() if @center_coordinates

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

    $logger.game.info 'Game started'

  onKeys: (@key_map) -> null

  onKey: (key) ->
    @key_map[key]() if @key_map[key]
    @currentScreen.onKey key if @currentScreen

  showScreen: (screen) ->
    screen = @screens[screen] if typeof screen is 'string'

    $logger.game.info "Showing screen '#{screen.name}'"

    i_screen.turnOff() for name, i_screen of @screens
    screen.turnOn()
    @currentScreen = screen

  startInput: ->
    getXandY = (e) =>
      x = e.clientX - @canvas.getBoundingClientRect().left
      x -= (@canvas.width/2) if @center_coordinates
      y = e.clientY - @canvas.getBoundingClientRect().top
      y -= (@canvas.height/2) if @center_coordinates
      { x: x, y: y }

    @canvas.addEventListener('click', (e) =>
      @click = getXandY(e)
      e.stopPropagation()
      e.preventDefault()
    , false)

    @canvas.addEventListener('mousemove', (e) =>
      @mouse = getXandY(e)
    , false)

  addScreen: (screen) =>
    @screens[screen.name] = screen
    @addEntity screen
    @currentScreen ?= screen
