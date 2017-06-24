app.factory('fetcher', ['$http', '$httpParamSerializer', '$window', '$location', function($http, $httpParamSerializer, $window, $location) {
	let baseURL	= "http://localhost:3010/";

	let config  = {
		// withCredentials: true,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	};

	return {
		getAllUser : (data, callback) => { $http.get(baseURL + 'user' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getUser : (id, callback) => { $http.get(baseURL + 'user/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postUser : (data, callback) => { $http.post(baseURL + 'user', data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putUser : (id, data, callback) => { $http.put(baseURL + 'user/' + id, data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteUser : (id, callback) => { $http.delete(baseURL + 'user/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllEducation : (data, callback) => { $http.get(baseURL + 'education' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllInstitution : (data, callback) => { $http.get(baseURL + 'institution' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getLocation : (id, data, callback) => { $http.get(baseURL + 'location/' + id + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
	};
}]);
