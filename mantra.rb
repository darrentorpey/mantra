require 'sinatra'

set :logging, true
log = File.new 'sinatra.log', 'a'
STDOUT.reopen log
STDERR.reopen log
# set :public, File.dirname(__FILE__) + '/public'