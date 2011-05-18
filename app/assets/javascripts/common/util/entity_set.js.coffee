class EntitySet
  constructor: (@entities = []) ->

  add: (entity) ->
    @entities.push entity

  update: ->
    for entity in @entities
      entity.update()

  draw: (context) ->
    for entity in @entities
      entity.draw context
