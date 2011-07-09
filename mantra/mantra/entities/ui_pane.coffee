class Mantra.UIPane extends EntitySet
  constructor: (@game, @options = {}) ->
    super @game, (@options.entities || [])...
    @pane = true

  addElement: (draw_func) ->
    entity = new Mantra.Entity @game
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

      text              = text_item.text.apply @
      text_item.x       = @game.canvas.width/2 - Math.round(context.measureText(text).width)/2 if text_item.x == 'centered' && !@game.center_coordinates
      text_item.x       = -Math.round(context.measureText(text).width)/2 if text_item.x == 'centered' && @game.center_coordinates
      text_item.y       = @game.canvas.height/2 if text_item.y == 'centered' && !@game.center_coordinates
      text_item.y       = -8 if text_item.y == 'centered' && @game.center_coordinates

      context.fillText text, text_item.x, text_item.y
