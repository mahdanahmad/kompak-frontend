app.factory('fetcher', ['$http', '$httpParamSerializer', '$window', '$location', function($http, $httpParamSerializer, $window, $location) {
	let baseURL	= "http://localhost:3010/";

	let config  = {
		// withCredentials: true,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	};

	return {
		getAllUser: (data, callback) => { $http.get(baseURL + 'user' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getUser: (id, callback) => { $http.get(baseURL + 'user/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postUser: (data, callback) => { $http.post(baseURL + 'user', data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putUser: (id, data, callback) => { $http.put(baseURL + 'user/' + id, data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteUser: (id, callback) => { $http.delete(baseURL + 'user/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllQuestion: (data, callback) => { $http.get(baseURL + 'question' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getQuestion: (id, callback) => { $http.get(baseURL + 'question/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postQuestion: (data, callback) => { $http.post(baseURL + 'question', data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putQuestion: (id, data, callback) => { $http.put(baseURL + 'question/' + id, data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteQuestion: (id, callback) => { $http.delete(baseURL + 'question/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllAnswer: (data, callback) => { $http.get(baseURL + 'answer' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getAnswer: (id, callback) => { $http.get(baseURL + 'answer/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postAnswer: (data, callback) => { $http.post(baseURL + 'answer', data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putAnswer: (id, data, callback) => { $http.put(baseURL + 'answer/' + id, data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteAnswer: (id, callback) => { $http.delete(baseURL + 'answer/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllEssay: (data, callback) => { $http.get(baseURL + 'essay' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getEssay: (id, callback) => { $http.get(baseURL + 'essay/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postEssay: (data, callback) => { $http.post(baseURL + 'essay', data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putEssay: (id, data, callback) => { $http.put(baseURL + 'essay/' + id, data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteEssay: (id, callback) => { $http.delete(baseURL + 'essay/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllEducation: (data, callback) => { $http.get(baseURL + 'education' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllInstitution: (data, callback) => { $http.get(baseURL + 'institution' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getLocation: (id, data, callback) => { $http.get(baseURL + 'location/' + id + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllCategory: (data, callback) => { $http.get(baseURL + 'category' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
	};
}]);
