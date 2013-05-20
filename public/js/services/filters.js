Deploys.factory('$filters', ['$api', function($api) {
	return {
		types: [],
		filters: {},
		fetch: function() {
			var result = {};

			$api.get('filters').success(function(data) {
				this.filters = data.filters;
				this.types = data.types;

				_.each(_.keys(filters), function(type) {
					collection = filters[type];

					if (collection != undefined) {
						result[type] = _.map(collection, function(filter) {
							return { id: filter, name: filter }; // TODO: i18n
						});
					}
				});
			});
			return result;
		}
	};
}]);
