$map_string = '''
xxxxxxxxxxxxxxxxxxxxxx
x    x x             x
x      x             x
x      xxxx       xxxx
x  x   x             x
x      x      o      x
x  o   x             x
x            x x     x
x            xxx     x
x      x             x
x      x             x
x      x             x
x      x             x
x      x      xxxxxxxx
x      x             x
x      x r           x
x      x       oo    x
xxxxxxxxxxxxxxxxxxxxxx
'''

class EightByFive extends GameBoard
  constructor: (@options = {}) ->
    @canvas = @options.canvas
    @assets {
      images: ['alien.png']
    }

    super @options

    @addScreen ScreenMaker.create this, 'loading'

    @setScreens {

      main: (screen) =>
        @defender = new Defender this
        @defender.setCoords x: 300, y: 150
        screen.add @defender

        @map_def = {
          map_width:    22
          map_height:   20
          piece_width:  32
          piece_height: 32
          nuller:       ' '
          translations: {
            'o' : 'orange'
            'r' : 'red'
            'x' : null
          }
        }

        # @color_map = Map.generateColorMapFromASCII $map_string, @map_def
        @map = new Map {
          map_width:    @map_def.map_width,
          map_height:   @map_def.map_height,
          piece_width:  @map_def.piece_width,
          piece_height: @map_def.piece_height
          translations: @map_def.translations
        }

        @map_data = $map_string.replace(/\n/g, '').trim().split('')
        @map.drawFrom @map_data, @map_def.nuller

        @color_map = @map.color_map

        @map_presence = @map.getPresenceLookup @map_data, @map_def.nuller

        # console.log @color_map

        padding_w = 20
        padding_h = 16
        padding_w = 0
        padding_h = 0
        screen.add new MapEntity this, { x: ent.x + padding_w, y: ent.y + padding_h, w: 32, h: 32, style: ent.obj } for ent in @color_map

        # screen.add new MapEntity this, { x: -100, y: -20, w: 32, h: 32 }

        screen.onKeys
          P: =>
            @showScreen 'pause'
            # @bg_song.pause()

        screen

      pause: (screen) =>
        pause_ui_pane = new UIPane this
        pause_ui_pane.addTextItem
          color: 'white'
          x:     'centered'
          y:     'centered'
          text:  -> ':: paused ::'

        screen.add pause_ui_pane

        screen.onKeys {
          P: =>
            @showScreen 'main'
            # @bg_song.resume()
        }
        
        screen
    }

    @addScreen ScreenMaker.create this, 'intro', {
      text: 'Click anywhere to start!'
    }

  configureEngine: ->
    # Levels, in increasing order of verbosity: off, error, warn, info, debug
    console.log $logger
    $logger.levels {
      global: 'debug'
      sound:  'warn'
      assets: 'info'
      input:  'info'
      game:   'info'
    }