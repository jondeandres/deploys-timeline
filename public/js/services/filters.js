Deploys.factory('$filters', ['$api', function($api) {
	return {
		types: [],
		filters: {},
		active_filters: {},

		fetch: function() {
			var result = {};
      var that = this;

			$api.get('filters').success(function(data) {
				that.filters = data.filters;
				that.types = data.types;

				_.each(_.keys(that.filters), function(type) {
					collection = that.filters[type];

					if (collection != undefined) {
						result[type] = _.map(collection, function(filter) {
							return { id: filter, name: filter }; // TODO: i18n
						});
					}
				});
			});
			return result;
		},
    path: function() {
      var that = this;
      var path =  _.reduce(that.types, function(path, type) {
        var value = that.active_filters[type];
        if (value != null) {
          path += "/" + type + "/" + value
        }
        return path;
      }, "");

      return path;
    }
	};
}]);
