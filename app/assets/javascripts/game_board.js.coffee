class GameBoard
  constructor: (@canvas) ->
    @canvas ?= GameBoard.create_canvas()
    @context = @canvas.getContext("2d")
    @entities = [];
    @lastUpdateTimestamp = null;
    @deltaTime = null;

    @surfaceWidth = null;
    @surfaceHeight = null;
    @halfSurfaceWidth = null;
    @halfSurfaceHeight = null;

  init: (context) ->
    @context           = context;
    @surfaceWidth      = @context.canvas.width;
    @surfaceHeight     = @context.canvas.height;
    @halfSurfaceWidth  = @surfaceWidth/2;
    @halfSurfaceHeight = @surfaceHeight/2;

  add_entity: (entity) ->
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

    callback() if callback

    @context.restore()

  loop: ->
    now = Date.now();
    @deltaTime = now - @lastUpdateTimestamp
    @update()
    @draw()
    # console.log now
    @lastUpdateTimestamp = now

  start: ->
    console.log 'Starting game:'
    @lastUpdateTimestamp = Date.now()
    # var that = this;
    gameLoop = () =>
      @loop()
      requestAnimFrame gameLoop, @context.canvas
    gameLoop()

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