function api_path(path) {
	return "/api/" + path;
}

var Deploys = angular.module("deploys", []);

Deploys.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
	$routeProvider.
		when('/', { templateUrl: '/templates/deploys/list.html', controller: DeployListCtrl }).
  	when('/country/:country', { templateUrl: '/templates/deploys/list.html', controller: DeployListCtrl }).
		when('/project/:project', { templateUrl: '/templates/deploys/list.html', controller: DeployListCtrl }).
		when('/environment/:environment', { templateUrl: '/templates/deploys/list.html', controller: DeployListCtrl });
	$locationProvider.html5Mode(true);
}]);
