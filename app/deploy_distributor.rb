class DeployDistributor
  attr_reader :deploy

  def initialize(deploy)
    @deploy = deploy
  end

  def distribute
    sets_to_enqueue.each do |set|
      redis.zadd(set, deploy.date.to_i, deploy.id)
    end
  end

  def redis
    @redis ||= ::Redis.new
  end

  def set_for(project, environment)
    set = ["deploys"]
    set << project if project
    set << environment if environment
    set.join(":")
  end

  def sets_to_enqueue
    [set_for(nil, nil),
     set_for(deploy.project, nil),
     set_for(deploy.project, deploy.environment),
     set_for(nil, deploy.environment)]
  end
end
