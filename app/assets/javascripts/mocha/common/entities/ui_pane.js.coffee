class UIPane extends EntitySet
  constructor: (@game, @entities...) ->
    super @game, @entities...
    @pane = true

  addElement: (draw_func) ->
    entity = new Entity @game
    entity.draw = (context) ->
      draw_func.apply this, [context]
    @add entity
