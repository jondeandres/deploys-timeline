require 'singleton'

class FiltersManager
  include Singleton

  def types
    [:country, :project, :environment]
  end

  def filters
    types.inject({}) do |hash, type|
      hash[type] = redis.smembers(key_for(type))
      hash
    end
  end

  def add_filters_for(deploy)
    types.each do |type|
      value = deploy.send(type)
      add_filter(type, value) if value
    end
  end

  def add_filter(type, value)
    redis.sadd(key_for(type), value)
  end

  def redis
    @redis ||= Redis.new
  end

  def key_for(type)
    "filters:#{type}"
  end
end
