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

  getPresence: (data, nuller) ->
    i = 0
    @presence_map = {}
    for datum in data
      x = i%@map_width
      y = Math.floor(i/@map_width)
      @presence_map["#{x}|#{y}"] = @translations[datum] if (datum != nuller) && (typeof @translations[datum] != 'undefined')
      i++
    @presence_map

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

  @tileCollision: (obj, map_def, map_presence) ->
    # First, we set collisions on all sides of "th" (the object we're checking) to be false.
    #  We'll set these to true if it turns out we're colliding.  If these are colliding, the
    #   function will then set acceleration along these axes to zero. You may not want to do this!
    #  The way your object reacts to collsion should probably be in its own function!
    [obj.touchedup, obj.toucheddown, obj.touchedleft, obj.touchedright] = [false, false, false, false]

    # Set our tolerance and approximation to defaults if not provided by the "data" object -- see
    #  official documentation above
    data ?= {}
    tolerance     = data.tolerance     || 6
    approximation = data.approximation || 10

    for t in [tolerance..(obj.colw - tolerance)] by approximation
      bottom_tile = @getTileInMap map_presence, obj.x + obj.colx + t, obj.y + obj.coly + obj.colh - 1, map_def.piece_width, map_def.piece_height, map_def.map_width, map_def.map_height
      top_tile    = @getTileInMap map_presence, obj.x + obj.colx + t, obj.y + obj.coly,                map_def.piece_width, map_def.piece_height, map_def.map_width, map_def.map_height
      obj.toucheddown = true if bottom_tile
      obj.touchedup   = true if top_tile

    for t in [tolerance..(obj.colh - tolerance)] by approximation
      left_tile  = @getTileInMap map_presence, obj.x + obj.colx,                obj.y + obj.coly + t, map_def.piece_width, map_def.piece_height, map_def.map_width, map_def.map_height
      right_tile = @getTileInMap map_presence, obj.x + obj.colx + obj.colw - 1, obj.y + obj.coly + t, map_def.piece_width, map_def.piece_height, map_def.map_width, map_def.map_height
      obj.touchedleft  = true if left_tile  #if map.tileIsSolid th, left_tile
      obj.touchedright = true if right_tile #if map.tileIsSolid th, right_tile

    obj.y = @yPixelToTile(map_def.piece_height, obj.y + obj.coly) - obj.coly                              if obj.touchedup
    obj.y = @yPixelToTile(map_def.piece_height, obj.y + obj.coly + obj.colh, 0) - obj.coly - obj.colh     if obj.toucheddown
    obj.x = @xPixelToTile(map_def.piece_width,  obj.x + obj.colx, 1) - obj.colx                           if obj.touchedleft
    obj.x = @xPixelToTile(map_def.piece_width,  obj.x + obj.colx + obj.colw - 1, 0) - obj.colx - obj.colw if obj.touchedright
    #th.x = help.xPixelToTile(map, th.x + th.colx + th.colw - 1) - th.colx - th.colw;


  # * Given x,y coordinates and map information, this returns the tile at a given point.
  # * @param {Integer} x An x-coordinate.
  # * @param {Integer} y A y-coordinate.
  # * @param {Object} map The map object.
  # * @param {Object} ifout An object or value to be returned if the x,y coordinate pair is outside the map.
  # * @param {String} mapid The id for the map array within the map object. Default is 'map'.
  # * @returns An integer representing the value of the tile in the map array at that x,y coordinate. If there is no tile, null is returned.
  @getTileInMap: (map_presence, x, y, tile_width, tile_height, map_width, map_height) ->
    tile_x = (Math.floor (x / tile_width))  - 1
    tile_y = (Math.floor (y / tile_height)) - 1
    # console.log arguments
    # console.log 'tile_x', tile_x
    # console.log 'tile_y', tile_y
    # return null if (tile_y < 0) || (tile_y >= map_width)
    # return null if (tile_x < 0) || (tile_x >= map_height)
    # console.log "map_presence['#{tile_x}|#{tile_y}']"
    # console.log map_presence["#{tile_x}|#{tile_y}"]

    return 'yes' if map_presence["#{tile_x}|#{tile_y}"] == null

    return null

  @yPixelToTile: (tile_height, y, gap = 1) ->
    (Math.floor(y/tile_height) + gap) * tile_height

  @xPixelToTile: (tile_width, x, gap = 1) ->
    (Math.floor(x/tile_width) + gap) * tile_width
    # (Math.floor(x/ts.tilew)+(gap?gap:0))*ts.tilew;
