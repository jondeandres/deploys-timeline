require 'grape'
require 'deploy'

class API < Grape::API
  format :json
  prefix 'api'

  namespace :deploys do
    desc 'Creates a deploy'
    params do
      requires :project, type: String
      requires :branch, type: String
      requires :environment, type: String
      requires :sha, type: String
      optional :author, type: String
    end

    post do
      deploy = Deploy.create(params)
      present deploy
    end
  end
end
