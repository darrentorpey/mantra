class EightByFive extends Mantra.Game
  constructor: (@options = {}) ->
    @canvas = @options.canvas
    @assets
      sounds:
        'bullet_shot' : 'simple_shot.mp3'

    super @options

    @addScreen ScreenMaker.create @, 'loading'

    @addScreen ScreenMaker.create @, 'intro'
      text: 'Click anywhere to start!'

    @addScreen ScreenMaker.create @, 'pause'

    @setScreens
      game: (screen) =>
        @defender = new Defender @
        @defender.setCoords x: 332, y: 182
        screen.add @defender

        @map = @loadMap()
        screen.add new MapEntity @, { x: ent.x, y: ent.y, w: 32, h: 32, style: ent.obj } for ent in @map.objectMap()

        screen.onKeys
          P: => @showScreen 'pause'

        screen

  loadMap: -> new Map
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

  configureEngine: ->
    # Levels, in increasing order of verbosity: off, error, warn, info, debug
    $logger.levels
      global: 'debug'
      sound:  'warn'
      assets: 'info'
      input:  'info'
      game:   'info'
