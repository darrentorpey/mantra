class Earth extends Actor
  constructor: () ->
    # @sprite = 
    # console.log @sprite.width
    @angle = 0
    @x = 0
    @y = 0
    super(AssetManager.getAsset('/assets/earth.png'))

  update: ->
    # console.log "Earth#update"
    # @x = @radial_distance * Math.cos(@angle)
    # @y = @radial_distance * Math.sin(@angle)
    @radial_distance -= @speed * gb.deltaTime
    super()

  draw: (ctx) ->
    # @drawSpriteCentered(ctx);
    # console.log "@sprite #{@sprite}"
    # console.log "@sprite #{@sprite.width}, #{@sprite.height}"
    # console.log "x,y #{@x}, #{@y}"
    x = @x - @sprite.width/2
    # console.log "x #{x}"
    gb.context.drawImage(@sprite, x, @y - @sprite.height/2)
    super(ctx)