app.factory('fetcher', ['$http', '$httpParamSerializer', '$window', '$location', function($http, $httpParamSerializer, $window, $location) {
	let baseURL	= "http://localhost:3010/";

	let config  = {
		// withCredentials: true,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	};

	return {
		getAllUser : (data, callback) => { $http.get(baseURL + 'user' + '?' + $httpParamSerializer(data)).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
	};
}]);
