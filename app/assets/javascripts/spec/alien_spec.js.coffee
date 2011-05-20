describe 'Alien:', ->
  describe 'a new one', ->
    it 'should not suck', ->
      AssetManager.queueImage '/assets/alien.png'
      AssetManager.queueSound '/assets/alien_boom.mp3'
      AssetManager.downloadAll()

      alien = new Alien

      # m_alien = sinon.mock alien
      # expectation = m_alien.expects 'explode'
      # alien.explode()
      # m_alien.verify()

      # stubby = sinon.stub alien, 'explode'
      am = AssetManager
      sinon.stub am, 'getSound', ->
        play: ->
          console.log 'yay'

      alien.explode()
      # expect(alien.explode).toHaveBeenCalled()

      # thing = m_alien.explode
      # thing()
      # expect(thing).toHaveBeenCalled()

      # spy = sinon.spy alien.explode
      # alien.explode()
      # expect(spy).toHaveBeenCalled()