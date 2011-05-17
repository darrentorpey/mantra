class Canvas
  @create_canvas: ->
    @create_canvas_j().prependTo('body').get(0)

  @create_canvas_j: ->
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