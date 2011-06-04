class Map
  constructor: (options) ->
    @map_width    = options.map_width
    @map_height   = options.map_height
    @piece_width  = options.piece_width
    @piece_height = options.piece_height
    @color_map    = []
    @translations = options.translations

  drawFrom: (data, nuller) ->
    i = 0
    @color_map = []
    for datum in data
      @color_map.push { x: i%@map_width * @piece_width, y: Math.floor(i/@map_width) * @piece_height, obj: @translations[datum] } if datum != nuller
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
    map.drawFrom data, map_options.nuller

    map.color_map
