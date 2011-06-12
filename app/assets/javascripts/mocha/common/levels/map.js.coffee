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
    # obj.colx = obj.x
    # obj.coly = obj.y
    # First, we set collisions on all sides of "th" (the object we're checking) to be false.
    #  We'll set these to true if it turns out we're colliding.  If these are colliding, the
    #   function will then set acceleration along these axes to zero. You may not want to do this!
    #  The way your object reacts to collsion should probably be in its own function!
    [obj.touchedup, obj.toucheddown, obj.touchedleft, obj.touchedright] = [false, false, false, false]

    # Set our tolerance and approximation to defaults if not provided by the "data" object -- see
    #  official documentation above
    data ?= {}
    tolerance     = data.tolerance     || 0
    approximation = data.approximation || 1

    # console.log tolerance
    # console.log approximation
    # console.log arguments
    # IMPORTANT: To make this easier to understand, I'm going to assume that tolerance = 0 for
    #  the rest of this function! once you understand it without tolerance, it's easy to add in
    #  the concept of tolerance.  ALSO IMPORANT: We'll assume approximation = 1.

    # This "t" variable is confusing, but for our purposes it's -1.
    t = tolerance - approximation

    # A do-while loop that runs until t === the width of the object's collision area minus
    #  tolerance minus 1. So if we have a 32x32 object we're checking, using our values this will
    #  run until t is 31 (32 - 1 = 31) Basically the loop runs left to right across the sprite's
    #  collision area (that's what t does, it traverses x) and then checks above and below the
    #  sprite to see if we're colliding on the top or bottom at position x=t
    while t != obj.colw - tolerance - 1
      # console.log 'tick'
      # If we're far enough to the right that we're outside of the area we're testing for
      #  collision (in this case, when t > 31) we clamp the value for t to 31. This does two things:
      #  it breaks the while loop because we're done traversing, but it also makes sure that we
      #  always get ONE collision test on the very far right edge of our collision area (if
      #  approximation is bigger than the width of our collision area, we could skip the sprite
      #  altogether -- this ensures we get at least one valid check)
      t = obj.colw - tolerance - 1 if t > obj.colw - tolerance - 1

      # When you see "obj.x + obj.colx" or "obj.y + obj.coly", that is just "the absolute x/y position of
      #  the upper left corner of our collision mask".
      # So to break it down: the first argument we're passing getTileInMap is the absolute X position
      #  that we're at while we traverse the collision mask from right to left. The second argument is
      #  a constant: it's just the bottom of our collision mask, minus 1. So we're asking for the tile
      #  that is along our current X value, but is just inside the bottom edge of our collision mask.
      #  IE: "Hey, what tile am I colliding with on the bottom at at this particular X point?"
      bottom_tile = @getTileInMap map_presence, obj.x + obj.colx + t, obj.y + obj.coly + obj.colh - 1, map_def.piece_width, map_def.piece_height, map_def.map_width, map_def.map_height

      # Same but for the *top* of the collision mask
      top_tile    = @getTileInMap map_presence, obj.x + obj.colx + t, obj.y + obj.coly,                map_def.piece_width, map_def.piece_height, map_def.map_width, map_def.map_height
      # console.log 'bottom_tile', bottom_tile if bottom_tile
      # console.log 'top_tile', top_tile if top_tile

      # If our top or bottom colliding tiles are solid, set the appropriate variables
      obj.toucheddown = true if bottom_tile #map.tileIsSolid th, top_tile
      obj.touchedup   = true if top_tile    #map.tileIsSolid th, bottom_tile

      t += approximation

    # This does the same thing but traverses top to bottom and checks tiles that are just inside
    #  the left or right edge of our collision mask
    t = tolerance - approximation
    while t != obj.colh - tolerance - 1
      t = obj.colh - tolerance - 1 if (t > obj.colh - tolerance - 1)

      left_tile  = @getTileInMap map_presence, obj.x + obj.colx,                obj.y + obj.coly + t, map_def.piece_width, map_def.piece_height, map_def.map_width, map_def.map_height
      right_tile = @getTileInMap map_presence, obj.x + obj.colx + obj.colw - 1, obj.y + obj.coly + t, map_def.piece_width, map_def.piece_height, map_def.map_width, map_def.map_height

      obj.touchedleft  = true if left_tile  #if map.tileIsSolid th, left_tile
      obj.touchedright = true if right_tile #if map.tileIsSolid th, right_tile

      t += approximation

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
