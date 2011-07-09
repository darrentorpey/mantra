class Mantra.Map
  constructor: (@options) ->
    @map_width    = @options.map_width
    @map_height   = @options.map_height
    @tile_width   = @options.tile_width
    @tile_height  = @options.tile_height
    @translations = @options.translations

    @map_data     = @options.data
    @map_data     = @map_data.replace(/\n/g, '').trim().split('') if typeof @map_data == 'string'

  objectMap: ->
    @object_map ||= @generateObjectMap()

  generateObjectMap: ->
    i = 0
    object_map = []
    for tile in @map_data
      object_map.push { x: i%@map_width * @tile_width, y: Math.floor(i/@map_width) * @tile_height, obj: @translations[tile] } unless @translations[tile] == null
      i++
    object_map

  presenceLookup: ->
    @presence_map ||= @generatePresenceLookup()

  generatePresenceLookup: ->
    i = 0
    lookup = {}
    for datum in @map_data
      x = i%@map_width
      y = Math.floor(i/@map_width)
      lookup["#{x}|#{y}"] = true if @tileIsSolid datum
      i++
    lookup

  tileIsSolid: (tile) -> !!@translations[tile]?.solid

  tileCollision: (obj) ->
    Mantra.Map.tileCollision obj, @, @presenceLookup()

  @tileCollision: (obj, map_def, presence_map) ->
    [obj.touchedup, obj.toucheddown, obj.touchedleft, obj.touchedright] = [false, false, false, false]

    data ?= {}
    tolerance     = data.tolerance     || 6
    approximation = data.approximation || 10

    for t in [tolerance..(obj.colw - tolerance)] by approximation
      bottom_tile = @getTileInMap presence_map, obj.x + obj.colx + t, obj.y + obj.coly + obj.colh - 1, map_def.tile_width, map_def.tile_height, map_def.map_width, map_def.map_height
      top_tile    = @getTileInMap presence_map, obj.x + obj.colx + t, obj.y + obj.coly,                map_def.tile_width, map_def.tile_height, map_def.map_width, map_def.map_height
      obj.toucheddown = true if bottom_tile
      obj.touchedup   = true if top_tile

    for t in [tolerance..(obj.colh - tolerance)] by approximation
      left_tile  = @getTileInMap presence_map, obj.x + obj.colx,                obj.y + obj.coly + t, map_def.tile_width, map_def.tile_height, map_def.map_width, map_def.map_height
      right_tile = @getTileInMap presence_map, obj.x + obj.colx + obj.colw - 1, obj.y + obj.coly + t, map_def.tile_width, map_def.tile_height, map_def.map_width, map_def.map_height
      obj.touchedleft  = true if left_tile  #if map.tileIsSolid th, left_tile
      obj.touchedright = true if right_tile #if map.tileIsSolid th, right_tile

    obj.y = @yPixelToTile(map_def.tile_height, obj.y + obj.coly) - obj.coly                              if obj.touchedup
    obj.y = @yPixelToTile(map_def.tile_height, obj.y + obj.coly + obj.colh, 0) - obj.coly - obj.colh     if obj.toucheddown
    obj.x = @xPixelToTile(map_def.tile_width,  obj.x + obj.colx, 1) - obj.colx                           if obj.touchedleft
    obj.x = @xPixelToTile(map_def.tile_width,  obj.x + obj.colx + obj.colw - 1, 0) - obj.colx - obj.colw if obj.touchedright

  @getTileInMap: (presence_map, x, y, tile_width, tile_height, map_width, map_height) ->
    tile_x = (Math.floor (x / tile_width))  - 1
    tile_y = (Math.floor (y / tile_height)) - 1

    return 'solid' if presence_map["#{tile_x}|#{tile_y}"]

    return null

  @yPixelToTile: (tile_height, y, gap = 1) ->
    (Math.floor(y/tile_height) + gap) * tile_height

  @xPixelToTile: (tile_width, x, gap = 1) ->
    (Math.floor(x/tile_width) + gap) * tile_width
