class Mantra.Animation
  constructor: (@spriteSheet, @frameWidth, @frameDuration, @loop) ->
    @frameHeight = @spriteSheet.height
    @totalTime   = (@spriteSheet.width / @frameWidth) * @frameDuration
    @elapsedTime = 0

  drawFrame: (tick, ctx, x, y, scaleBy) ->
    scaleBy ?= 1
    @elapsedTime += tick

    if @loop
     if @isDone()
       @elapsedTime = 0
    else if @isDone()
     return

    index = @currentFrame()
    locX  = x - (@frameWidth/2) * scaleBy
    locY  = y - (@frameHeight/2) * scaleBy
    ctx.drawImage @spriteSheet,
                 index*@frameWidth, 0,  # source from sheet
                 @frameWidth, @frameHeight,
                 locX, locY,
                 @frameWidth*scaleBy,
                 @frameHeight*scaleBy
  currentFrame: ->
    Math.floor @elapsedTime / @frameDuration

  isDone: ->
    @elapsedTime >= @totalTime
