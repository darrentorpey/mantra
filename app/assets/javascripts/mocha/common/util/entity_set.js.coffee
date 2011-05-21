class EntitySet
  constructor: (@game, @entities...) ->
    @visible = true
    @paused  = false

  add: (new_entities...) ->
    @entities.push entity for entity in new_entities

  update: ->
    entity.update() for entity in @entities unless @paused

  draw: (context) ->
    entity.draw context for entity in @entities if @visible

  pause: ->
    @paused = true

  unpause: ->
    @paused = false

  hide: ->
    @visible = false

  show: ->
    @visible = true

  cull: ->
    for i in [@entities.length - 1...0]
      @entities.splice i, 1 if @entities[i].remove_from_world