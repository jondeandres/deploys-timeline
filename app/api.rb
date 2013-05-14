require 'grape'

class API < Grape::API
  format :json
  prefix 'api'
end
