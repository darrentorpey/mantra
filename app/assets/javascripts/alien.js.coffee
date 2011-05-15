class Alien extends Actor
  update: ->
    @x = @radial_distance * Math.cos(@angle)
    @y = @radial_distance * Math.sin(@angle)
    @radial_distance -= @speed * gb.deltaTime
    super()

  draw: (ctx) ->
    @drawSpriteCentered(ctx);
    super(ctx)