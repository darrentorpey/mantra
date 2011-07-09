class Mantra.Background extends Mantra.CustomDrawEntity
  constructor: (@game, position) ->
    position ?= { x: 0, y: 0 }
    super @game, position
    @coords = for i in [0..50]
      big = !(i % 4)
      { x: Math.random() * @game.canvas.width, y: Math.random() * @game.canvas.height, w: (if big then 3 else 2), h: (if big then 3 else 2) }

  draw: (context) ->
    context.fillStyle = 'white'
    context.fillRect @x + coord_set.x, @y + coord_set.y, coord_set.w, coord_set.h for coord_set in @coords
