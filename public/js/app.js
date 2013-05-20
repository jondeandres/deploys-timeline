function api_path(path) {
	return "/api/" + path;
}

var Deploys = angular.module("deploys", []).
	config(["$routeProvider", function($routeProvider) {
		$routeProvider.
			when('/', { templateUrl: '/templates/deploys/list.html', controller: DeployListCtrl }).
  		when('/country/:country', { templateUrl: '/templates/deploys/list.html', controller: DeployListCtrl }).
			when('/project/:project', { templateUrl: '/templates/deploys/list.html', controller: DeployListCtrl }).
			when('/environment/:environment', { templateUrl: '/templates/deploys/list.html', controller: DeployListCtrl });
	}]);

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
