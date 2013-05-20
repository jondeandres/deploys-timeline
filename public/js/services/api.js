Deploys.factory('$api', ['$http', function($http) {
	return {
		_prefix: '/api/',
		api_path: function(path) {
			return (this._prefix + path);
		},
		get: function(path) {
			return $http.get(api_path(path));
		}
	};
}]);
