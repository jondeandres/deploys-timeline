function DeployFiltersCtrl($scope, $http) {
	$scope.filters = {};

	$http.get(api_path('filters')).success(function(data) {
		_.each(_.keys(data), function(type) {
			filters = data[type];

			if (filters != undefined) {
				$scope.filters[type] = _.map(filters, function(filter) {
					return {
						id: filter,
						name: filter // TODO: i18n
					};
				});
			}
		});
	});

	$scope.changePath = function() {
		// TODO: Change current path
	};
}

function DeployListCtrl($scope, $route, $routeParams, $http) {
	var	render = function() {
		// TODO: Change api path depending on current hash.
		$http.get(api_path('deploys')).success(
			function(data) {
				$scope.deploys = data.deploys;
			});
	};

	render();
};
