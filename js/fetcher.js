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

		getAllEssayAns: (data, callback) => { $http.get(baseURL + 'essayanswer' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getEssayAns: (id, callback) => { $http.get(baseURL + 'essayanswer/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postEssayAns: (data, callback) => { $http.post(baseURL + 'essayanswer', data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putEssayAns: (id, data, callback) => { $http.put(baseURL + 'essayanswer/' + id, data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteEssayAns: (id, callback) => { $http.delete(baseURL + 'essayanswer/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllEducation: (data, callback) => { $http.get(baseURL + 'education' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getEducation: (id, callback) => { $http.get(baseURL + 'education/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postEducation: (data, callback) => { $http.post(baseURL + 'education', data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putEducation: (id, data, callback) => { $http.put(baseURL + 'education/' + id, data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteEducation: (id, callback) => { $http.delete(baseURL + 'education/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllInstitution: (data, callback) => { $http.get(baseURL + 'institution' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getInstitution: (id, callback) => { $http.get(baseURL + 'institution/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postInstitution: (data, callback) => { $http.post(baseURL + 'institution', data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putInstitution: (id, data, callback) => { $http.put(baseURL + 'institution/' + id, data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteInstitution: (id, callback) => { $http.delete(baseURL + 'institution/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getLocation: (id, data, callback) => { $http.get(baseURL + 'location/' + id + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postLocation: (id, data, callback) => { $http.post(baseURL + 'location/' + id, data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putLocation: (id, data, callback) => { $http.put(baseURL + 'location/' + id, data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteLocation: (id, callback) => { $http.delete(baseURL + 'location/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllCategory: (data, callback) => { $http.get(baseURL + 'category' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getCategory: (id, callback) => { $http.get(baseURL + 'category/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postCategory: (data, callback) => { $http.post(baseURL + 'category', data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putCategory: (id, data, callback) => { $http.put(baseURL + 'category/' + id, data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteCategory: (id, callback) => { $http.delete(baseURL + 'category/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getSetting: (callback) => { $http.get(baseURL + 'setting', config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putSetting: (data, callback) => { $http.put(baseURL + 'setting', data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllBadge: (data, callback) => { $http.get(baseURL + 'badge' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getBadge: (id, callback) => { $http.get(baseURL + 'badge/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postBadge: (data, callback) => { $http.post(baseURL + 'badge', data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putBadge: (id, data, callback) => { $http.put(baseURL + 'badge/' + id, data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteBadge: (id, callback) => { $http.delete(baseURL + 'badge/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getStatistic: (callback) => { $http.get(baseURL + 'statistic', config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postAuth: (data, callback) => { $http.post(baseURL + 'auth', data, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
	};
}]);
