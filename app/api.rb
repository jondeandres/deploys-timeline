require 'grape'
require 'deploy'
require 'deploy_finder'
require 'deploy_distributor'
require 'filters_manager'

class API < Grape::API
  format :json
  prefix 'api'

  def self.each_deploy_path(&block)
    get(&block)

    DeployDistributor.combinations.each do |combination|
      path = combination.inject("") do |path_acc, criteria|
        path_acc += "/#{criteria}/:#{criteria}"
        path_acc
      end

      get(path, &block)
    end
  end

  namespace :filters do
    get do
      manager = FiltersManager.instance
      {
        filters: manager.filters,
        types: manager.types
      }
    end
  end

  namespace :deploys do
    desc 'Creates a deploy'
    params do
      requires :project, type: String
      requires :branch, type: String
      requires :environment, type: String
      requires :sha, type: String
      optional :country, type: String
      optional :author, type: String
    end

    post do
      deploy = Deploy.create(params)
      present(deploy)
    end

    each_deploy_path do
      deploys = DeployFinder.new(params).result
      present(deploys)
    end
  end
end
