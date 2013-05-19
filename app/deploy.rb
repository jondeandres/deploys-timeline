require 'ostruct'
require 'redis'
require 'grape-entity'
require 'deploy_distributor'

class Deploy < OpenStruct
  def self.create(attrs = {})
    new_id = redis.incr(count_key)
    attrs[:id] = new_id
    attrs[:date] = Time.now.utc
    redis.hmset(key_for(new_id), *attrs)

    instance = new(attrs)
    DeployDistributor.new(instance).distribute
    instance
  end

  def self.find(id)
    new(redis.hgetall(key_for(id)))
  end

  def self.redis
    @redis ||= ::Redis.new
  end

  def self.prefix
    "deploys"
  end

  def self.key_for(id)
    "#{prefix}:#{id}"
  end

  def self.count_key
    "#{prefix}:count"
  end

  class Entity < Grape::Entity
    expose :id, :project, :environment, :branch,
           :sha, :date, :author, :country
  end
end
