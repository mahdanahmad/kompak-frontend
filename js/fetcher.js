app.factory('fetcher', ['$http', '$httpParamSerializer', '$window', '$location', function($http, $httpParamSerializer, $window, $location) {
	let baseURL	= "http://localhost:3010";

	// let config  = { headers: {'Content-Type': undefined}, transformRequest: angular.identity };
	let config  = { withCredentials: true, headers: { 'Content-Type': 'application/json; charset=utf-8' }};

	return {

	};
}]);
