class DeployDistributor
  attr_reader :deploy

  def self.criterias
    @criterias ||= [:country, :project, :environment]
  end

  def self.combinations
    @combinations ||= (1..criterias.length).inject([]) do  |acc, i|
      acc += criterias.combination(i).to_a
      acc
    end
  end

  def initialize(deploy)
    @deploy = deploy
  end

  def combinations
    self.class.combinations
  end

  def distribute
    sets_to_enqueue.each do |set|
      redis.zadd(set, deploy.date.to_i, deploy.id)
    end
  end

  def redis
    @redis ||= ::Redis.new
  end

  def sets_to_enqueue
    combinations.inject([]) do |sets, combination|
      if combination.map{|attr| deploy.send(attr) }.all?
        sets << combination.inject("deploys") do |acc, attr|
          value = deploy.send(attr)
          acc += ":#{attr}:#{value}"
          acc
        end
      end
      sets
    end
  end
end
