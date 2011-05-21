class Entity
  constructor: (@game, @sprite, coords = { x: 0, y: 0 }) ->
    @x = coords.x
    @y = coords.y
    @remove_from_world = false

  update: ->
    null

  draw: (context) ->
    if @game.showOutlines && @radius
      context.beginPath();
      context.strokeStyle = 'green';
      context.arc @x, @y, @radius, 0, Math.PI*2, false
      context.stroke();
      context.closePath();

  drawSpriteCentered: (context) ->
    x = @x - @sprite.width/2
    y = @y - @sprite.height/2
    context.drawImage(@sprite, x, y)

  drawSpriteCenteredRotated: (context) ->
    context.save()
    context.translate @x, @y
    context.rotate @angle + Math.PI/2
    context.drawImage @sprite, -@sprite.width/2, -@sprite.height/2
    context.restore()

  rotateAndCache: (image) ->
    offscreenCanvas = document.createElement 'canvas'
    size            = Math.max image.width, image.height
    offscreenCanvas.width  = size
    offscreenCanvas.height = size
    offscreenCtx           = offscreenCanvas.getContext '2d'
    offscreenCtx.translate size/2, size/2
    offscreenCtx.rotate @angle + Math.PI/2
    offscreenCtx.drawImage image, -(image.width/2), -(image.height/2)
    offscreenCanvas

  outsideScreen: ->
    (@x > @game.halfSurfaceWidth || @x < -(@game.halfSurfaceWidth) || @y > @game.halfSurfaceHeight || @y < -(@game.halfSurfaceHeight))

  listen: (type, callback) ->
    EventManager.instance.listen(type, this, callback)

  s_coords: ->
    "#{@x.toString()[0..5]}, #{@y.toString()[0..5]}"

  cull: -> null