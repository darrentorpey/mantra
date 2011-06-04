class Map
  constructor: (options) ->
    @map_width    = options.map_width
    @map_height   = options.map_height
    @piece_width  = options.piece_width
    @piece_height = options.piece_height
    @color_map    = []
    @translations = options.translations

  drawFrom: (data, width, nuller) ->
    i = 0
    @color_map = []
    for datum in data
      @color_map.push { x: i%width, y: Math.floor(i/width), obj: @translations[datum] } if datum != nuller
      i++

  @generateColorMapFromASCII: (map_string, map_options) ->
    map = new Map {
      map_width:    map_options.map_width,
      map_height:   map_options.map_height,
      piece_width:  map_options.piece_width,
      piece_height: map_options.piece_height
      translations: map_options.translations
    }

    data = map_string.replace(/\n/g, '').trim().split('')
    map.drawFrom data, map_options.map_width, map_options.nuller

    map.color_map

# [@map_width, @map_height, @piece_width, @piece_height] = [map_width, map_height, piece_width, piece_height]    