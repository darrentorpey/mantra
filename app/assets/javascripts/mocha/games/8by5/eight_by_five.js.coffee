$map_string = '''
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
x                  xx                                      xx                  x
x                  xx                                      xx                  x
xxxxxxxx      x    xx                  xxxxxxxxx      x    xx                  x
x             x    xxxxxxxxxx          xx             x    xxxxxxxxxx          x
x             x                        xx             x                        x
x             x                        xx             x                        x
x     xxxx  xxxxxxxxx           xxxxxxxxx     xxxx  xxxxxxxxx           xxxxxxxx
x                  xx                  xx                  xx                  x
x                  xx                                      xx                  x
xxxx               xx                    xxx               xx                  x
x      xxxxxxxxx   xx                  xxxxx   xxxxxxxxx   xx                  x
x                  xx                  xx                  xx                  x
x                  xx        x         xx                  xx        x         x
xxxxxxx  xxxxxxxxxxxx        x         xxxxxxxx  xxxxxxxxxxxx        x         x
xxxxxxx  xxxxxxxxxxxx        x         xxxxxxxx  xxxxxxxxxxxx        x         x
x                  xx      xxxx        xx                  xx      xxxx        x
x                  xx        x         xx                  xx        x         x
xxxxxxxx      x    xx        x             xxxxx      x    xx        x         x
x             x    xx                  xx             x    xx                  x
x             x    xx                  xx             x    xx                  x
x             x    xx                  xx             x    xx                  x
x     xxxx  xxxxxxxxx                  xx     xxxx  xxxxxxxxx                  x
x                  xx                  xx                  xx                  x
xxxx                                   xxxxx                                   x
x                                                                              x
x      xxxxxxxxx   xx                          xxxxxxxxx   xx                  x
x                  xx                  xx                  xx                  x
x                                      xx                  xx                  x
x                                      xx                  xx                  x
x                  xx                  xx                  xx                  x
x                  xx                  xx                  xx                  x
xxxxxxxx      x    xx                  xxxxxxxxx      x    xx                  x
x             x    xxxxxxxxxx          xx             x    xxxxxxxxxx          x
x             x                        xx             x                        x
x             x                        xx             x                        x
x     xxxx  xxxxxxxxx           xxxxxxxxx     xxxx  xxxxxxxxx           xxxxxxxx
x                  xx                  xx                  xx                  x
x                  xx                                      xx                  x
xxxx               xx                    xxx               xx                  x
x      xxxxxxxxx   xx                  xxxxx   xxxxxxxxx   xx                  x
x                  xx                  xx                  xx                  x
x                  xx        x         xx                  xx        x         x
xxxxxxx  xxxxxxxxxxxx        x         xxxxxxxx  xxxxxxxxxxxx        x         x
xxxxxxx  xxxxxxxxxxxx        x         xxxxxxxx  xxxxxxxxxxxx        x         x
x                  xx      xxxx        xx                  xx      xxxx        x
x                  xx        x         xx                  xx        x         x
xxxxxxxx      x    xx        x             xxxxx      x    xx        x         x
x             x    xx                  xx             x    xx                  x
x             x    xx                  xx             x    xx                  x
x             x    xx                  xx             x    xx                  x
x     xxxx  xxxxxxxxx                  xx     xxxx  xxxxxxxxx                  x
x                  xx                  xx                  xx                  x
xxxx                                   xxxxx                                   x
x                                                                              x
x      xxxxxxxxx   xx                          xxxxxxxxx   xx                  x
x                  xx                  xx                  xx                  x
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
'''

$map_string = '''
xxxxxxxx
x    x x
x      x
x      x
x  x   x
x      x
x  or  x
xxxxxxxx
'''

class EightByFive extends GameBoard
  constructor: (@options = {}) ->
    @canvas = @options.canvas
    @assets {
      images: ['alien.png']
    }

    super @options

    @setScreens {
      loading: (screen) =>
        @loading_ui_pane = new UIPane this

        @loading_ui_pane.addTextItem
          color: 'orange'
          x:     'centered'
          y:     0
          text:  -> "Loading... #{AssetManager.getProgress()}%"

        screen.add @loading_ui_pane

        screen.onUpdate = =>
          if @state.current_state != 'initialized' && AssetManager.isDone()
            @showScreen 'intro'

        screen

      main: (screen) =>
        screen.onUpdate = =>
          console.log 'main'

        @defender = new Defender this
        @defender.setCoords x: -200, y: -200
        screen.add @defender

        @color_map = Map.generateColorMapFromASCII $map_string, {
          map_width:    8
          map_height:   8
          piece_width:  32
          piece_height: 32
          nuller:       ' '
          translations: {
            'o' : 'orange'
            'r' : 'red'
            'x' : null
          }
        }

        console.log @color_map.length
        screen.add new MapEntity this, { x: ent.x, y: ent.y, w: 24, h: 24, style: ent.obj } for ent in @color_map

        # screen.add new MapEntity this, { x: -100, y: -20, w: 32, h: 32 }

        screen.onKeys
          P: =>
            @showScreen 'pause'
            # @bg_song.pause()

        screen

      intro: (screen) =>
        intro_ui_pane = new UIPane this
        intro_ui_pane.addTextItem
          color: 'orange'
          x:     'centered'
          y:     0
          text:  -> 'Click to start!'

        screen.add intro_ui_pane
        screen.onUpdate = =>
          console.log 'intro'
          if @click
            # @bg_song.play()
            @showScreen 'main'

        screen

      pause: (screen) =>
        pause_ui_pane = new UIPane this
        pause_ui_pane.addTextItem
          color: 'white'
          x:     'centered'
          y:     0
          text:  -> ':: paused ::'

        screen.add pause_ui_pane

        screen.onKeys {
          P: =>
            @showScreen 'main'
            # @bg_song.resume()
        }
        
        screen
    }
