require 'ostruct'

class DeployFinder
  attr_accessor :params, :page, :from, :per_page

  def initialize(params = {})
    @page = params.delete(:page) || 1
    @from = params.delete(:from) || Time.now.utc
    @per_page = params.delete(:per_page) || 20
    @params = params
  end

  def prefix
    "deploys"
  end

  def offset
    per_page * (page - 1)
  end

  def result
    deploy_ids = redis.zrevrangebyscore(set, from.to_i, '-inf', {
        limit: [offset, per_page]
      })

    deploy_ids.map do |id|
      Deploy.find(id)
    end
  end

  def redis
    @redis ||= ::Redis.new
  end

  def set
    DeployDistributor.filters.inject(prefix) do |set_acc, criteria|
      value = params[criteria]
      set_acc += ":#{criteria}:#{value}" if value

      set_acc
    end
  end
end
