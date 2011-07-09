require 'rubygems'
require 'sinatra'

get '/' do
  begin
    File.read(File.join('public', 'index.html'))
  rescue
    "Hi there, You're missing an index.html file."
  end
end

not_found do
  begin
    File.read(File.join('public', '404.html'))  
  rescue
    'This is nowhere to be found'
  end
end

error 400..510 do
  begin
    File.read(File.join('public', '500.html'))
  rescue    
    'Boom'
  end
end