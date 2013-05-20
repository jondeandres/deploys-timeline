function DeployFiltersCtrl($scope, $http, $filters) {
	$scope.filters = $filters.fetch();
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
