class Background extends CustomDrawEntity
  constructor: (game, position) ->
    position ?= { x: 0, y: 0 }
    super game, position
    @span = game.canvas.width
    @num_stars = 50
    @coords = for i in [0..@num_stars]
      big = !(i % 4)
      { x: Math.random() * @span , y: Math.random() * @span, w: (if big then 3 else 2), h: (if big then 3 else 2) }

  update: ->
    super()

  draw: (context) ->
    context.fillStyle = 'white'
    for coord_set in @coords
      context.fillRect @x + coord_set.x, @y + coord_set.y, coord_set.w, coord_set.h

    super context
