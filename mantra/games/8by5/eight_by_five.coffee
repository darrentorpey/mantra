class EightByFive extends Mantra.Game
  constructor: (@options = {}) ->
    @player_name = 'Player 1'

    super _.defaults @options,
      assets:
        sounds:
          'bullet_shot' : 'games/8by5/audio/simple_shot.mp3'

      screens:
        loading: 'preset'
        pause:   'preset'
        intro:
          preset: 'intro'
          text:   -> "#{@player_name}, click anywhere to start!"
        game:
          elements: ->
            @defender = new Mantra.Defender @
            @defender.setCoords x: 332, y: 182

            @map = @loadMap()
            map_enities = []
            map_enities.push new Mantra.MapEntity @, { x: ent.x, y: ent.y, w: 32, h: 32, style: ent.obj.color } for ent in @map.objectMap()

            [@defender, map_enities...]
          on_keys:
            P: -> @game.showScreen 'pause'

  loadMap: -> new Mantra.Map
    map_width:    22
    map_height:   20
    tile_width:   32
    tile_height:  32
    translations:
      'o' : { solid: true,  color: 'orange' }
      'r' : { solid: false, color: 'red'    }
      'x' : { solid: true }
      ' ' : null
    data:
      '''
      xxxxxxxxxxxxxxxxxxxxxx
      x    x x             x
      x      x             x
      x      xxxx       xxxx
      x  x   x    r        x
      x      x      o      x
      x  o                 x
      x            x x     x
      x            xxx     x
      x      xx            x
      x      xx            x
      x      xx o     oo   x
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

root.EightByFive = EightByFive