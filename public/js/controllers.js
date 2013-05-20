function DeployFiltersCtrl($scope, $http) {
	$http.get(api_path('filters')).success(function(data) {
		$scope.countries = data.countries;
		$scope.environments = data.environments;
		$scope.projects = data.projects;
	});

	$scope.changePath = function() {

	};
}

function DeployListCtrl($scope, $route, $routeParams, $http) {
	var	render = function() {
		// TODO: Change path depending on current hash.
		$http.get(api_path('deploys')).success(
			function(data) {
				$scope.deploys = data.deploys;
			});
	};

	render();
};
