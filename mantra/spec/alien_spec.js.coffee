no_op = -> null

stub_canvas = ->
  sinon.stub Canvas, 'create_canvas', -> { getContext: -> no_op }

stub_asset_manager = ->
  sinon.stub AssetManager, 'getSound', -> { play: -> no_op }
  sinon.stub AssetManager, 'getImage', -> { height: 10, width: 10 }

stub_entity_sprites = ->
  sinon.stub Entity.prototype, 'rotateAndCache', -> { height: 10, width: 10 }

expect_true = (it) ->
  expect(it).toBeTruthy()

expect_called = (it) ->
  expect(it).toHaveBeenCalled()

describe 'Alien:', ->
  beforeEach ->
    stub_canvas()
    stub_entity_sprites()
    stub_asset_manager()
    @game = new Mantra.Game

  describe 'a new one', ->
    beforeEach ->
      @alien = new Alien @game

    it 'should be set for removal after exploding', ->
      s_alien = sinon.spy @alien, 'explode'
      @alien.explode()
      expect_true @alien.remove_from_world
      expect_called @alien.explode
