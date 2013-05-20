require 'sinatra/base'
require 'erb'

class Web < Sinatra::Base
  set :public_folder, -> { File.expand_path('../public', File.dirname(__FILE__)) }

  get '/' do
    erb :index
  end
end
