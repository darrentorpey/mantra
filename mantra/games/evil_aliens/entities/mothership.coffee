class Mothership extends SpriteEntity
  constructor: (@game) ->
    super @game
    machine = new Machine()
    @state = machine.generateTree {
      identifier: 'idle',
      strategy: 'sequential',
      children: [
        identifier: 'move',
          identifier: 'spawn',
          strategy: 'sequential', 
          children: [
            { identifier: 'spawnOne' }
            { identifier: 'spawnMultiple' }
          ]
      ]
    }, @

    @spawn_delay = 1.5

  draw: -> null
  update: ->
    @state = @state.tick()

  idle: ->
    null

  move: ->
    # console.log 'moving...'

  canMove: ->
    true

  canSpawn: ->
    !@last_alien_addded_at || (@game.timer.time_passed - @last_alien_addded_at) > @spawn_delay

  spawnOne: ->
    $logger.game.info 'Spawning one'
    @spawnAlien Math.random() * Math.PI * 180

  spawnMultiple: ->
    $logger.game.info 'Spawning multiple'
    @spawnAlien Math.random() * Math.PI * 180
    @spawnAlien Math.random() * Math.PI * 180

  spawnAlien: (angle) ->
    new_alien = new Alien @game, @game.canvas.width/2 + 20, angle
    @game.screens.game.add new_alien
    @last_alien_addded_at = @game.timer.time_passed
    $logger.game.info "Alien spawn: #{new_alien.radial_distance}km @ #{new_alien.angle}"

root.Mothership = Mothership