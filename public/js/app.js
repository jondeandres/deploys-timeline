function api_path(path) {
	return "/api/" + path;
}

var Deploys = angular.module("deploys", []);

Deploys.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
		when('/', { templateUrl: '/templates/deploys/list.html', controller: DeployListCtrl }).
  	when('/country/:country', { templateUrl: '/templates/deploys/list.html', controller: DeployListCtrl }).
		when('/project/:project', { templateUrl: '/templates/deploys/list.html', controller: DeployListCtrl }).
		when('/environment/:environment', { templateUrl: '/templates/deploys/list.html', controller: DeployListCtrl });
}]);

Deploys.directive("deployFilters", function() {
	return {
		restrict: 'E',
		templateUrl: '/templates/deploys/filters.html',
		controller: DeployFiltersCtrl
	};
});

function DeployFiltersCtrl($scope, $http) {
	$http.get('/filters').success(function(data) {
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
