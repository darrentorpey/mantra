describe 'Entity Set:', ->
  beforeEach ->
    @entity_set = new EntitySet

  it "can be updated", ->
    @entity_set.update()

  it "can be drawn", ->
    @entity_set.draw()

  it "can have entities added to it", ->
    @entity_set.add {}

  describe "with entities added to it", ->
    beforeEach ->
      @s_update   = jasmine.createSpy()
      @s_draw     = jasmine.createSpy()
      @s_update_2 = jasmine.createSpy()
      @s_draw_2   = jasmine.createSpy()
      @entity_set.add
        update: @s_update
        draw:   @s_draw
      @entity_set.add
        update: @s_update_2
        draw:   @s_draw_2

    it "updates its entities when it is updated", ->
      @entity_set.update()
      expect(@s_update.argsForCall.length).toEqual(1)
      expect(@s_update_2.argsForCall.length).toEqual(1)

    it "draws its entities when it is drawn, with the right context", ->
      context = 'context'
      @entity_set.draw context
      expect(@s_draw.argsForCall.length).toEqual(1)
      expect(@s_draw.argsForCall[0][0]).toEqual(context)
      expect(@s_draw_2.argsForCall.length).toEqual(1)
      expect(@s_draw_2.argsForCall[0][0]).toEqual(context)

    it "no longer updates its entities when updated while paused", ->
      @entity_set.pause()
      @entity_set.update()
      expect(@s_update.argsForCall.length).toEqual(0)
      expect(@s_update_2.argsForCall.length).toEqual(0)

    it "no longer draws its entities when drawn while hidden", ->
      @entity_set.hide()
      @entity_set.draw()
      expect(@s_draw.argsForCall.length).toEqual(0)
      expect(@s_draw_2.argsForCall.length).toEqual(0)

