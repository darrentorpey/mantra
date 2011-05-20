class GameBoard
  constructor: (@canvas) ->
    @canvas ?= Canvas.create_canvas()
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

  addEntity: (new_entities...) ->
    @entities.push entity for entity in new_entities

  # Move coordinate system to center of canvas
  translate_to_center: ->  
    @context.translate @canvas.width/2, @canvas.height/2

  update: ->
    # Update every entity that isn't ready to be removed from the game world
    entity.update() for entity in @entities when !entity.remove_from_world

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
