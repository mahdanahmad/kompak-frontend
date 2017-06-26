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
			$http.post(baseURL + 'question', data, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putQuestion: function putQuestion(id, data, callback) {
			$http.put(baseURL + 'question/' + id, data, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteQuestion: function deleteQuestion(id, callback) {
			$http.delete(baseURL + 'question/' + id, config).then(function (success) {
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
			$http.post(baseURL + 'answer', data, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putAnswer: function putAnswer(id, data, callback) {
			$http.put(baseURL + 'answer/' + id, data, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteAnswer: function deleteAnswer(id, callback) {
			$http.delete(baseURL + 'answer/' + id, config).then(function (success) {
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
			$http.post(baseURL + 'essay', data, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putEssay: function putEssay(id, data, callback) {
			$http.put(baseURL + 'essay/' + id, data, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteEssay: function deleteEssay(id, callback) {
			$http.delete(baseURL + 'essay/' + id, config).then(function (success) {
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
			$http.post(baseURL + 'essayanswer', data, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		putEssayAns: function putEssayAns(id, data, callback) {
			$http.put(baseURL + 'essayanswer/' + id, data, config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		},
		deleteEssayAns: function deleteEssayAns(id, callback) {
			$http.delete(baseURL + 'essayanswer/' + id, config).then(function (success) {
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
		},

		getAllCategory: function getAllCategory(data, callback) {
			$http.get(baseURL + 'category' + '?' + $httpParamSerializer(data), config).then(function (success) {
				callback(success.data);
			}, function (error) {
				callback(error.data);
			});
		}
	};
}]);
//# sourceMappingURL=fetcher.js.map
