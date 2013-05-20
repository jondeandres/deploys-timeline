Deploys.factory('$filters', ['$api', function($api) {
	return {
		fetch: function() {
			var result = {};

			$api.get('filters').success(function(data) {
				_.each(_.keys(data), function(type) {
					filters = data[type];

					if (filters != undefined) {
						result[type] = _.map(filters, function(filter) {
							return { id: filter, name: filter }; // TODO: i18n
						});
					}
				});
			});
			return result;
		}
	};
}]);
