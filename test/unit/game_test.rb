require 'test_helper'

class GameTest < ActiveSupport::TestCase
  should "be valid" do
    assert Game.new.valid?
  end
end
