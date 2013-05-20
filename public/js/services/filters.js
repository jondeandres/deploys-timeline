Deploys.factory('$filters', ['$http', function($http) {
	return {
		fetch: function() {
			var result = {};

			$http.get(api_path('filters')).success(function(data) {
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
