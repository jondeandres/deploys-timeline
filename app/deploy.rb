require 'ostruct'
require 'redis'
require 'grape-entity'

class Deploy < OpenStruct
  def self.create(attrs = {})
    new_id = redis.incr(count_key)
    attrs[:id] = new_id
    attrs[:date] = Time.now.utc
    redis.hmset(key_for(new_id), *attrs)

    new(attrs)
  end

  def self.redis
    @redis ||= ::Redis.new
  end

  def self.key_for(id)
    "deploys:#{id}"
  end

  def self.count_key
    "deploys:count"
  end

  class Entity < Grape::Entity
    expose :id, :project, :environment, :branch,
           :sha, :date, :author
  end
end