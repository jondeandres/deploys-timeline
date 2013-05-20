function DeployFiltersCtrl($scope, $filters, $location) {
	$scope.filters = $filters.fetch();
	$scope.active_filters = $filters.active_filters;

	$scope.updatePath = function() {
    $location.path($filters.path());
	};
}

function DeployListCtrl($scope, $route, $routeParams, $api, $filters) {
	var	render = function() {
		$api.get('deploys' + $filters.path()).success(
			function(data) {
				$scope.deploys = data.deploys;
			});
	};

	render();
};
