app.factory('fetcher', ['$http', '$httpParamSerializer', 'localStorageService', '$window', '$location', function($http, $httpParamSerializer, localStorageService, $window, $location) {
	let baseURL	= "http://api.server1.gapura-desa.id/";
	// let baseURL	= "http://localhost:3010/";

	let config  = {
		// withCredentials: true,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	};

	return {
		getAllUser: (data, callback) => { $http.get(baseURL + 'user' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getUser: (id, callback) => { $http.get(baseURL + 'user/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postUser: (data, callback) => { $http.post(baseURL + 'user', _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putUser: (id, data, callback) => { $http.put(baseURL + 'user/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteUser: (id, callback) => { $http(_.assign({ method: "DELETE", url: baseURL + 'user/' + id, data: { defendant: localStorageService.get('id') }}, config)).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllAdmin: (data, callback) => { $http.get(baseURL + 'admin' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getAdmin: (id, callback) => { $http.get(baseURL + 'admin/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postAdmin: (data, callback) => { $http.post(baseURL + 'admin', _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putAdmin: (id, data, callback) => { $http.put(baseURL + 'admin/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteAdmin: (id, callback) => { $http(_.assign({ method: "DELETE", url: baseURL + 'admin/' + id, data: { defendant: localStorageService.get('id') }}, config)).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllQuestion: (data, callback) => { $http.get(baseURL + 'question' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getQuestion: (id, callback) => { $http.get(baseURL + 'question/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postQuestion: (data, callback) => { $http.post(baseURL + 'question', _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putQuestion: (id, data, callback) => { $http.put(baseURL + 'question/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteQuestion: (id, callback) => { $http(_.assign({ method: "DELETE", url: baseURL + 'question/' + id, data: { defendant: localStorageService.get('id') }}, config)).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllAnswer: (data, callback) => { $http.get(baseURL + 'answer' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getAnswer: (id, callback) => { $http.get(baseURL + 'answer/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postAnswer: (data, callback) => { $http.post(baseURL + 'answer', _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putAnswer: (id, data, callback) => { $http.put(baseURL + 'answer/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteAnswer: (id, callback) => { $http(_.assign({ method: "DELETE", url: baseURL + 'answer/' + id, data: { defendant: localStorageService.get('id') }}, config)).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllEssay: (data, callback) => { $http.get(baseURL + 'essay' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getEssay: (id, callback) => { $http.get(baseURL + 'essay/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postEssay: (data, callback) => { $http.post(baseURL + 'essay', _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putEssay: (id, data, callback) => { $http.put(baseURL + 'essay/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteEssay: (id, callback) => { $http(_.assign({ method: "DELETE", url: baseURL + 'essay/' + id, data: { defendant: localStorageService.get('id') }}, config)).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllEssayAns: (data, callback) => { $http.get(baseURL + 'essayanswer' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getEssayAns: (id, callback) => { $http.get(baseURL + 'essayanswer/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postEssayAns: (data, callback) => { $http.post(baseURL + 'essayanswer', _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putEssayAns: (id, data, callback) => { $http.put(baseURL + 'essayanswer/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteEssayAns: (id, callback) => { $http(_.assign({ method: "DELETE", url: baseURL + 'essayanswer/' + id, data: { defendant: localStorageService.get('id') }}, config)).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllEducation: (data, callback) => { $http.get(baseURL + 'education' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getEducation: (id, callback) => { $http.get(baseURL + 'education/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postEducation: (data, callback) => { $http.post(baseURL + 'education', _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putEducation: (id, data, callback) => { $http.put(baseURL + 'education/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteEducation: (id, callback) => { $http(_.assign({ method: "DELETE", url: baseURL + 'education/' + id, data: { defendant: localStorageService.get('id') }}, config)).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllInstitution: (data, callback) => { $http.get(baseURL + 'institution' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getInstitution: (id, callback) => { $http.get(baseURL + 'institution/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postInstitution: (data, callback) => { $http.post(baseURL + 'institution', _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putInstitution: (id, data, callback) => { $http.put(baseURL + 'institution/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteInstitution: (id, callback) => { $http(_.assign({ method: "DELETE", url: baseURL + 'institution/' + id, data: { defendant: localStorageService.get('id') }}, config)).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getLocation: (id, data, callback) => { $http.get(baseURL + 'location/' + id + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postLocation: (id, data, callback) => { $http.post(baseURL + 'location/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putLocation: (id, data, callback) => { $http.put(baseURL + 'location/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteLocation: (id, callback) => { $http(_.assign({ method: "DELETE", url: baseURL + 'location/' + id, data: { defendant: localStorageService.get('id') }}, config)).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllCategory: (data, callback) => { $http.get(baseURL + 'category' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getCategory: (id, callback) => { $http.get(baseURL + 'category/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postCategory: (data, callback) => { $http.post(baseURL + 'category', _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putCategory: (id, data, callback) => { $http.put(baseURL + 'category/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteCategory: (id, callback) => { $http(_.assign({ method: "DELETE", url: baseURL + 'category/' + id, data: { defendant: localStorageService.get('id') }}, config)).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getSetting: (callback) => { $http.get(baseURL + 'setting', config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putSetting: (data, callback) => { $http.put(baseURL + 'setting', _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getAllBadge: (data, callback) => { $http.get(baseURL + 'badge' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getBadge: (id, callback) => { $http.get(baseURL + 'badge/' + id, config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postBadge: (data, callback) => { $http.post(baseURL + 'badge', _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		putBadge: (id, data, callback) => { $http.put(baseURL + 'badge/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		deleteBadge: (id, callback) => { $http(_.assign({ method: "DELETE", url: baseURL + 'badge/' + id, data: { defendant: localStorageService.get('id') }}, config)).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },

		getStatistic: (data, callback) => { $http.get(baseURL + 'statistic' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		postAuth: (data, callback) => { $http.post(baseURL + 'auth', _.assign(data, { defendant: localStorageService.get('id') }), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getLogs: (data, callback) => { $http.get(baseURL + 'logs' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data); }, (error) => { callback(error.data); }); },
		getList: (data, callback) => { $http.get(baseURL + 'list' + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data, success.headers); }, (error) => { callback(error.data); }); },
		getFiles: (name, data, callback) => { $http.get(baseURL + 'files/' + name + '?' + $httpParamSerializer(data), config).then((success) => { callback(success.data, success.headers); }, (error) => { callback(error.data); }); },
		getFilesLink: (name, data) => (baseURL + 'files/' + name + '?' + $httpParamSerializer(data)),

	};
}]);
