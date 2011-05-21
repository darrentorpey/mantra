class UIPane extends EntitySet
  constructor: (@game, @entities...) ->
    super @game, @entities...
    @pane = true

  addElement: (draw_func) ->
    new_el = new Entity @game
    new_el.draw = (context) ->
      console.log 'context'
      console.log context
      draw_func.apply this, [context]
    @add new_el
