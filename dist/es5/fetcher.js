'use strict';

app.factory('fetcher', ['$http', '$httpParamSerializer', 'localStorageService', '$window', '$location', function ($http, $httpParamSerializer, localStorageService, $window, $location) {
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
			$http.post(baseURL + 'user', _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putUser: function putUser(id, data, callback) {
			$http.put(baseURL + 'user/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteUser: function deleteUser(id, callback) {
			$http(_.assign({ method: "DELETE", url: baseURL + 'user/' + id, data: { defendant: localStorageService.get('id') } }, config)).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},

		getAllAdmin: function getAllAdmin(data, callback) {
			$http.get(baseURL + 'admin' + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		getAdmin: function getAdmin(id, callback) {
			$http.get(baseURL + 'admin/' + id, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		postAdmin: function postAdmin(data, callback) {
			$http.post(baseURL + 'admin', _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putAdmin: function putAdmin(id, data, callback) {
			$http.put(baseURL + 'admin/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteAdmin: function deleteAdmin(id, callback) {
			$http(_.assign({ method: "DELETE", url: baseURL + 'admin/' + id, data: { defendant: localStorageService.get('id') } }, config)).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},

		getAllQuestion: function getAllQuestion(data, callback) {
			$http.get(baseURL + 'question' + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		getQuestion: function getQuestion(id, callback) {
			$http.get(baseURL + 'question/' + id, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		postQuestion: function postQuestion(data, callback) {
			$http.post(baseURL + 'question', _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putQuestion: function putQuestion(id, data, callback) {
			$http.put(baseURL + 'question/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteQuestion: function deleteQuestion(id, callback) {
			$http(_.assign({ method: "DELETE", url: baseURL + 'question/' + id, data: { defendant: localStorageService.get('id') } }, config)).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},

		getAllAnswer: function getAllAnswer(data, callback) {
			$http.get(baseURL + 'answer' + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		getAnswer: function getAnswer(id, callback) {
			$http.get(baseURL + 'answer/' + id, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		postAnswer: function postAnswer(data, callback) {
			$http.post(baseURL + 'answer', _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putAnswer: function putAnswer(id, data, callback) {
			$http.put(baseURL + 'answer/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteAnswer: function deleteAnswer(id, callback) {
			$http(_.assign({ method: "DELETE", url: baseURL + 'answer/' + id, data: { defendant: localStorageService.get('id') } }, config)).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},

		getAllEssay: function getAllEssay(data, callback) {
			$http.get(baseURL + 'essay' + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		getEssay: function getEssay(id, callback) {
			$http.get(baseURL + 'essay/' + id, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		postEssay: function postEssay(data, callback) {
			$http.post(baseURL + 'essay', _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putEssay: function putEssay(id, data, callback) {
			$http.put(baseURL + 'essay/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteEssay: function deleteEssay(id, callback) {
			$http(_.assign({ method: "DELETE", url: baseURL + 'essay/' + id, data: { defendant: localStorageService.get('id') } }, config)).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},

		getAllEssayAns: function getAllEssayAns(data, callback) {
			$http.get(baseURL + 'essayanswer' + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		getEssayAns: function getEssayAns(id, callback) {
			$http.get(baseURL + 'essayanswer/' + id, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		postEssayAns: function postEssayAns(data, callback) {
			$http.post(baseURL + 'essayanswer', _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putEssayAns: function putEssayAns(id, data, callback) {
			$http.put(baseURL + 'essayanswer/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteEssayAns: function deleteEssayAns(id, callback) {
			$http(_.assign({ method: "DELETE", url: baseURL + 'essayanswer/' + id, data: { defendant: localStorageService.get('id') } }, config)).then(function (success) {
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
		getEducation: function getEducation(id, callback) {
			$http.get(baseURL + 'education/' + id, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		postEducation: function postEducation(data, callback) {
			$http.post(baseURL + 'education', _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putEducation: function putEducation(id, data, callback) {
			$http.put(baseURL + 'education/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteEducation: function deleteEducation(id, callback) {
			$http(_.assign({ method: "DELETE", url: baseURL + 'education/' + id, data: { defendant: localStorageService.get('id') } }, config)).then(function (success) {
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
		getInstitution: function getInstitution(id, callback) {
			$http.get(baseURL + 'institution/' + id, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		postInstitution: function postInstitution(data, callback) {
			$http.post(baseURL + 'institution', _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putInstitution: function putInstitution(id, data, callback) {
			$http.put(baseURL + 'institution/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteInstitution: function deleteInstitution(id, callback) {
			$http(_.assign({ method: "DELETE", url: baseURL + 'institution/' + id, data: { defendant: localStorageService.get('id') } }, config)).then(function (success) {
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
		},
		postLocation: function postLocation(id, data, callback) {
			$http.post(baseURL + 'location/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putLocation: function putLocation(id, data, callback) {
			$http.put(baseURL + 'location/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteLocation: function deleteLocation(id, callback) {
			$http(_.assign({ method: "DELETE", url: baseURL + 'location/' + id, data: { defendant: localStorageService.get('id') } }, config)).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},

		getAllCategory: function getAllCategory(data, callback) {
			$http.get(baseURL + 'category' + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		getCategory: function getCategory(id, callback) {
			$http.get(baseURL + 'category/' + id, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		postCategory: function postCategory(data, callback) {
			$http.post(baseURL + 'category', _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putCategory: function putCategory(id, data, callback) {
			$http.put(baseURL + 'category/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteCategory: function deleteCategory(id, callback) {
			$http(_.assign({ method: "DELETE", url: baseURL + 'category/' + id, data: { defendant: localStorageService.get('id') } }, config)).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},

		getSetting: function getSetting(callback) {
			$http.get(baseURL + 'setting', config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putSetting: function putSetting(data, callback) {
			$http.put(baseURL + 'setting', _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},

		getAllBadge: function getAllBadge(data, callback) {
			$http.get(baseURL + 'badge' + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		getBadge: function getBadge(id, callback) {
			$http.get(baseURL + 'badge/' + id, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		postBadge: function postBadge(data, callback) {
			$http.post(baseURL + 'badge', _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putBadge: function putBadge(id, data, callback) {
			$http.put(baseURL + 'badge/' + id, _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteBadge: function deleteBadge(id, callback) {
			$http(_.assign({ method: "DELETE", url: baseURL + 'badge/' + id, data: { defendant: localStorageService.get('id') } }, config)).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},

		getStatistic: function getStatistic(callback) {
			$http.get(baseURL + 'statistic', config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		postAuth: function postAuth(data, callback) {
			$http.post(baseURL + 'auth', _.assign(data, { defendant: localStorageService.get('id') }), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		getLogs: function getLogs(data, callback) {
			$http.get(baseURL + 'logs' + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		}
	};
}]);
//# sourceMappingURL=fetcher.js.map
