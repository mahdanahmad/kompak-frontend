'use strict';

app.factory('fetcher', ['$http', '$httpParamSerializer', '$window', '$location', function ($http, $httpParamSerializer, $window, $location) {
	var baseURL = "http://localhost:3010/";

	var config = {
		// withCredentials: true,
		headers: { 'Content-Type': 'application/json; charset=utf-8' }
	};

	return {
		getAllUser: function getAllUser(data, callback) {
			$http.get(baseURL + 'user' + '?' + $httpParamSerializer(data)).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		}
	};
}]);
//# sourceMappingURL=fetcher.js.map
