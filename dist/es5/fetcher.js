'use strict';

app.factory('fetcher', ['$http', '$httpParamSerializer', '$window', '$location', function ($http, $httpParamSerializer, $window, $location) {
	var baseURL = "http://localhost:3010/";

	var config = {
		// withCredentials: true,
		headers: { 'Content-Type': 'application/json; charset=utf-8' }
	};

	return {
		getAllUser: function getAllUser(data, callback) {
			$http.get(baseURL + 'user' + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		getUser: function getUser(id, callback) {
			$http.get(baseURL + 'user/' + id, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		postUser: function postUser(data, callback) {
			$http.post(baseURL + 'user', data, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putUser: function putUser(id, data, callback) {
			$http.put(baseURL + 'user/' + id, data, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteUser: function deleteUser(id, callback) {
			$http.delete(baseURL + 'user/' + id, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},

		getAllEducation: function getAllEducation(data, callback) {
			$http.get(baseURL + 'education' + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},

		getAllInstitution: function getAllInstitution(data, callback) {
			$http.get(baseURL + 'institution' + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},

		getLocation: function getLocation(id, data, callback) {
			$http.get(baseURL + 'location/' + id + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		}
	};
}]);
//# sourceMappingURL=fetcher.js.map
