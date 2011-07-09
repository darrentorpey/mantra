Mantra.Controls = {
  moveByKeys: ->
    @x -= @speed if keydown.left
    @x += @speed if keydown.right
    @y -= @speed if keydown.up
    @y += @speed if keydown.down
}