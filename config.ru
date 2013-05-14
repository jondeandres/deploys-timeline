$:.unshift(File.expand_path('app', File.dirname(__FILE__)))
require 'web'
require 'api'

run Rack::Cascade.new([Web, API])
