beforeEach(->
  this.addMatchers(
    toBePlaying: (expectedSong) ->
      @actual.currentlyPlayingSong == expectedSong && @actual.isPlaying
  )
)

it_is_good_to_be_alive = (obj) ->
  console.log obj
  =>
    'yes'
    console.log obj
    it "can be drawn", =>
      obj.draw()
# it_is_drawable: (obj) ->
#   ->
#     it "can be drawn", ->
#       obj.draw()
