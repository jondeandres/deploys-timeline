function DeployFiltersCtrl($scope, $filters) {
	$scope.filters = $filters.fetch();
	$scope.updatePath = function(type, active_filters) {

	};
}

function DeployListCtrl($scope, $route, $routeParams, $api) {
	var	render = function() {
		// TODO: Change api path depending on current hash.
		$api.get('deploys').success(
			function(data) {
				$scope.deploys = data.deploys;
			});
	};

	render();
};
