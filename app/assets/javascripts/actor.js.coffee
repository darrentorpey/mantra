class Actor
  constructor: (@sprite) ->
    @is_alive = true
    Actor.count++
    console.log "[new] Actor [#{Actor.count}]"
    gb.add_entity this

  # Prototype properties
  breed: -> new Actor if @is_alive
  die: ->
    Actor.count-- if @is_alive
    @is_alive = false

  update: ->
    null

  draw: ->
    null

  drawSpriteCentered: (ctx) ->
    # console.log 'drawSpriteCentered'
    x = @x - @sprite.width/2
    y = @y - @sprite.height/2
    # ctx.drawImage @sprite, x, y
    gb.context.drawImage(@sprite, x, y)

  # Class-level properties
  @count: 0
  @makeTrouble: ->
    console.log "@count #{@count}"
    # console.log ('I am an actor!' for i in [1..@count]).join(' ')

class SpaceShip extends Actor
  enjoy: ->
    console.log 'enjoying...'