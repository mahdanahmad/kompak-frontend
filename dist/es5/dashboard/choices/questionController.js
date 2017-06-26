'use strict';

app.controller('ChoicesController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, dialog, globalVar) {
	'use strict';

	var limit = 10;
	var iterate = 0;
	var typeDelay = 500;

	// $scope.categories	= [];
	$scope.category = {};

	$scope.data = [];
	$scope.pauseAjx = false;
	$scope.doneAjx = false;

	$scope.search = "";
	$scope.nodata = null;
	$scope.loading = globalVar.loading;

	var getSearch = function getSearch() {
		return $scope.search ? $scope.search.length >= 3 ? $scope.search : null : null;
	};

	$scope.loadMoar = function () {
		$scope.pauseAjx = true;
		iterate++;
		var data = _.omitBy({
			limit: limit,
			offset: iterate * limit,
			like: getSearch(),
			category: $scope.category.id
		}, _.isNil);
		fetcher.getAllQuestion(data, function (response) {
			if (response.response == 'OK' && response.status_code == 200 && response.result) {
				if (response.result.length < limit) {
					$scope.doneAjx = true;
				}
				$scope.data = _.concat($scope.data, response.result);
			} else {
				$scope.doneAjx = true;
			}
			$scope.pauseAjx = false;
		});
	};

	var delayTimeout = void 0;
	$scope.$watch('search', function (newVal, oldVal) {
		if (!_.isNil(newVal) && newVal !== oldVal) {
			if (delayTimeout) $timeout.cancel(delayTimeout);

			delayTimeout = $timeout(function () {
				if (newVal.length >= 3) {
					initData(newVal);
				} else if (newVal == '' && !$scope.pauseAjx) {
					initData();
				}
			}, typeDelay);
		} else {
			$scope.search = '';
		}
	});

	$scope.selectCate = function (selected) {
		$scope.category = selected;initData(getSearch());
	};

	$scope.newQuestion = function () {
		dialog.choicesDialog({ categories: $scope.categories }, function (dialResp) {
			if (_.isObject(dialResp)) {
				dialResp.question_enabled = dialResp.question_enabled ? '1' : '0';
				fetcher.postQuestion(_.mapValues(dialResp, _.toString), function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						initData(getSearch());
					}
				});
			}
		});
	};
	$scope.edit = function (id) {
		async.waterfall([function (callback) {
			fetcher.getQuestion(id, function (response) {
				if (response.response == 'OK' && response.status_code == 200) {
					callback(null, response.result);
				} else {
					callback(response.message);
				}
			});
		}, function (questionData, callback) {
			var before = _.clone(questionData);
			dialog.choicesDialog({ data: questionData, categories: $scope.categories }, function (response) {
				if (_.isObject(response) && !_.isEqual(before, response)) {
					callback(null, response);
				} else {
					callback(null);
				}
			});
		}], function (err, result) {
			if (err) {
				console.log(err);
			}

			if (result) {
				result.question_enabled = result.question_enabled ? '1' : '0';
				fetcher.putQuestion(result.ID_question, _.chain(result).mapValues(_.toString).omit(['no_of_times_correctly_answered', 'no_of_times_incorrectly_answered', 'no_of_times_presented_as_challenge', 'no_of_times_response_1', 'no_of_times_response_2', 'no_of_times_response_3', 'no_of_times_response_4']).value(), function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						initData(getSearch());
					}
				});
			}
		});
	};

	$scope.changeEna = function (o, e) {
		e.stopPropagation();
		var question_enabled = o.question_enabled ? '0' : '1';

		fetcher.putQuestion(o.ID_question, { question_enabled: question_enabled }, function (response) {
			if (response.response == 'OK' && response.status_code == 200) {
				o.question_enabled = !o.question_enabled;
			}
		});
	};
	$scope.delete = function (id, question, e) {
		e.stopPropagation();
		dialog.confirm('Are you sure you wanna delete question \"' + question + '\"?', function (response) {
			if (response) {
				fetcher.deleteQuestion(id, function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						initData(getSearch());
					}
				});
			}
		});
	};

	var initData = function initData(like) {
		$scope.pauseAjx = true;
		$scope.nodata = null;
		iterate = 0;
		fetcher.getAllQuestion(_.omitBy({ limit: limit, like: like, offset: 0, category: $scope.category.id }, _.isNil), function (response) {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.data = response.result;
				if (!response.result) {
					$scope.nodata = globalVar.nodata;$scope.doneAjx = true;
				} else if (response.result.length < limit) {
					$scope.doneAjx = true;
				} else {
					$scope.doneAjx = false;
				}
				$scope.pauseAjx = false;
			}
		});
	};

	var init = function init() {
		fetcher.getAllCategory({}, function (response) {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.categories = _.chain(response.result).map(function (o) {
					return { id: o.ID_category, name: o.category_name };
				}).concat([{ id: null, name: 'All' }]).sortBy(['name']).value();
				$scope.category = _.head($scope.categories);

				initData();
			}
		});
	};

	init();
}]);
//# sourceMappingURL=questionController.js.map
