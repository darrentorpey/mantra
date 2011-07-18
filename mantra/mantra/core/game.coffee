class Mantra.Game
  constructor: (@options) ->
    @canvas  ?= @options.canvas || Mantra.Canvas.create_canvas()
    @context  = @canvas.getContext '2d'
    @entities = []
    @timer    = new Mantra.Timer
    @screens  = {}
    @key_map  = {}

    _.defaults @options,
      assets:
        images: []
      screens:
        loading: 'preset'
      center_coordinates: false
      process_game_over:  -> null

    @center_coordinates = true if @options.center_coordinates

    @state = new FSM 'initialized', { name: 'initialized' }
    @state.add_transition 'start', 'initialized', null,                      'started'
    @state.add_transition 'lose',  'started', (=> @options.process_game_over.call @), 'game_lost'
    @state.add_transition 'restart', ['started', 'game_won', 'game_lost'], null, 'started'

    [@surfaceWidth, @surfaceHeight, @halfSurfaceWidth, @halfSurfaceHeight] = [null, null, null, null]

    for screen_name, definition of @options.screens
      definition = { preset: screen_name } if typeof definition is 'string' and definition == 'preset'
      @defineScreen screen_name, definition

    @key_map = @options.on_keypress if @options.on_keypress
    @assets @options.assets      if @options.assets

  assets: (@assets) -> null

  init: ->
    @surfaceWidth      = @canvas.width
    @surfaceHeight     = @canvas.height
    @halfSurfaceWidth  = @surfaceWidth/2
    @halfSurfaceHeight = @surfaceHeight/2

    @startGameLoop on_screen: 'loading'

    @startInput()

  start: ->
    @showScreen @currentScreen

    @state.send_event 'start'

    $logger.game.info 'Game started'

  addEntity: (new_entities...) -> @entities.push entity for entity in new_entities

  # Move coordinate system to center of canvas
  translateToCenter: -> @context.translate @canvas.width/2, @canvas.height/2

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
    @translateToCenter() if @center_coordinates

    entity.draw @context for entity in @entities

    callback this if callback

    @context.restore()

  loop: ->
    @clock_tick = @timer.tick()
    @update()
    @draw()
    @click = null

  startGameLoop: (options = {}) ->
    @showScreen options.on_screen if @screens[options.on_screen]

    @gameLoop()

  gameLoop: =>
    @loop()
    requestAnimFrame @gameLoop, @canvas

  onKey: (key) ->
    @key_map[key]() if @key_map[key]
    @currentScreen.onKey key if @currentScreen

  showScreen: (screen) ->
    screen = @screens[screen] if typeof screen is 'string'

    $logger.game.info "Showing screen '#{screen.name}'"

    skreen.turnOff() for name, skreen of @screens
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

  defineScreen: (name, definition = {}) ->
    screen = new Mantra.Screen @, name, definition
    @screens[screen.name] = screen
    @addEntity screen
