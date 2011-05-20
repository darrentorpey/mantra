# A sample Guardfile
# More info at https://github.com/guard/guard#readme
# guard 'coffeescript', :output => 'public/javascripts/compiled' do
#   watch(/^app\/assets\/javascripts\/(.*).coffee/)
# end
# 
guard 'coffeescript', :output => 'spec/javascripts/compiled' do
  watch(/^spec\/javascripts\/(.*).coffee/)
end

guard 'coffeescript', :input => 'app/assets/javascripts', :output => 'public/javascripts/compiled', :bare => true
# guard 'coffeescript', :input => 'spec/javascripts', :output => 'spec/javascripts/compiled', :bare => true