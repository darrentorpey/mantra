class EightByFive extends GameBoard
  constructor: (@options = {}) ->
    @canvas = @options.canvas
    @assets
      images: ['alien.png']

    super @options

    @addScreen ScreenMaker.create this, 'loading'

    @setScreens
      main: (screen) =>
        @defender = new Defender this
        @defender.setCoords x: 300, y: 150
        screen.add @defender

        @map = new Map
          map_width:    22
          map_height:   20
          tile_width:   32
          tile_height:  32
          nuller:       ' '
          translations:
            'o' : 'orange'
            'r' : 'red'
            'x' : null
          data:'''
            xxxxxxxxxxxxxxxxxxxxxx
            x    x x             x
            x      x             x
            x      xxxx       xxxx
            x  x   x             x
            x      x      o      x
            x  o                 x
            x            x x     x
            x            xxx     x
            x      xx            x
            x      xx            x
            x      xx o          x
            x      xx            x
            x      xx     xxxxxxxx
            x                    x
            x      xx r          x
            x      xx      or    x
            xxxxxxxxxxxxxxxxxxxxxx
            '''

        screen.add new MapEntity this, { x: ent.x, y: ent.y, w: 32, h: 32, style: ent.obj } for ent in @map.objectMap()


        screen.onKeys
          P: => @showScreen 'pause'

        screen

    @addScreen ScreenMaker.create this, 'intro'
      text: 'Click anywhere to start!'

    @addScreen ScreenMaker.create this, 'pause'

  configureEngine: ->
    # Levels, in increasing order of verbosity: off, error, warn, info, debug
    $logger.levels
      global: 'debug'
      sound:  'warn'
      assets: 'info'
      input:  'info'
      game:   'info'
