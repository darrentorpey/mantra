class UIPane extends EntitySet
  constructor: (@game, @entities...) ->
    super @game, @entities...
    @pane = true

  addElement: (draw_func) ->
    entity = new Entity @game
    entity.draw = (context) ->
      draw_func.apply this, [context]
    @add entity

  addText: (text_draw) ->
    @addElement (context) ->
      context.fillStyle = 'red'
      context.font      = 'bold 2em Arial'
      text_draw()

  addTextItem: (text_item) ->
    @addElement (context) ->
      context.fillStyle = text_item.color || 'red'
      context.font      = text_item.font  || 'bold 2em Arial'
      text_item.text.apply this
