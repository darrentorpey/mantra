class Canvas
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