describe('Events System', function() {
  var alien;
  var event_manager = EventManager.instance;

  beforeEach(function() {
    alien = new Alien();
  });

  it("should signal its creation", function() {
    // player.resume();
    expect(event_manager.signal).toHaveBeenCalled()
    // expect(player.isPlaying).toBeTruthy();
    // expect(player.currentlyPlayingSong).toEqual(song);
  });
});