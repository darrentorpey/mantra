class Mantra.Canvas
  @create_canvas: ->
    @j_createCanvas().prependTo('body').get(0)

  @j_createCanvas: ->
    $('<canvas>')
      .attr(
        id:     'game_surface'
        width:  '800'
        height: '600'
      )
      .css(
        'background-color': 'black'
        margin:             '0px auto'
        display:            'block'
      )

  @circle: (context, params) ->
    context.fillStyle = params.style
    context.beginPath()
    context.arc params.x, params.y, params.radius, 0, Math.PI*2, true
    context.closePath()
    context.fill()

  @rectangle: (context, params) ->
    context.fillStyle   = params.style
    context.strokeStyle = params.style
    context.lineWidth   = params.borderWidth || 1
    if params.hollow
      context.strokeRect params.x, params.y, params.w, params.h
    else
      context.fillRect params.x, params.y, params.w, params.h
