describe 'UI Pane:', ->
  beforeEach ->
    @ui_pane = new UIPane

  # describe "with entities added to it", ->
  #   console.log 'here'
  #   console.log @ui_pane
  #   me = it_is_good_to_be_alive(@ui_pane)
  #   console.log me()

  it "can be drawn", ->
    @ui_pane.draw()

  it "can be updated", ->
    @ui_pane.update()

  it "can have entities added to it", ->
    @ui_pane.add {}
