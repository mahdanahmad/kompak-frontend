'use strict';

app.controller('EssayController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, dialog, globalVar) {
	'use strict';

	var limit = 15;
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

	$scope.startDate = moment().year(2017).startOf('year').toDate();
	$scope.endDate = moment().toDate();
	$scope.dateChange = function () {
		init();
	};
	$scope.downloadLink = function () {
		return fetcher.getFilesLink('essaydata', _.omitBy({
			startdate: moment($scope.startDate).format(globalVar.dateFormat),
			enddate: moment($scope.endDate).format(globalVar.dateFormat),
			like: getSearch(),
			category: $scope.category.id
		}, _.isNil));
	};

	var getSearch = function getSearch() {
		return $scope.search ? $scope.search.length >= 3 ? $scope.search : null : null;
	};

	$scope.openHint = function () {
		dialog.notif(globalVar.essayHint);
	};

	$scope.loadMoar = function () {
		$scope.pauseAjx = true;
		iterate++;
		var data = _.omitBy({
			limit: limit,
			offset: iterate * limit,
			like: getSearch(),
			category: $scope.category.id,
			startdate: moment($scope.startDate).format(globalVar.dateFormat),
			enddate: moment($scope.endDate).format(globalVar.dateFormat)
		}, _.isNil);
		fetcher.getAllEssay(data, function (response) {
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
		dialog.essayDialog({ categories: $scope.categories }, function (dialResp) {
			if (_.isObject(dialResp)) {
				fetcher.postEssay(_.mapValues(dialResp, _.toString), function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						initData(getSearch());
					}
				});
			}
		});
	};
	$scope.edit = function (id) {
		if ($scope.$parent.role) {
			async.waterfall([function (callback) {
				fetcher.getEssay(id, function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						callback(null, response.result);
					} else {
						callback(response.message);
					}
				});
			}, function (questionData, callback) {
				var before = _.clone(questionData);
				dialog.essayDialog({ data: questionData, categories: $scope.categories }, function (response) {
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
					fetcher.putEssay(result.id, _.chain(result).mapValues(_.toString).omit([]).value(), function (response) {
						if (response.response == 'OK' && response.status_code == 200) {
							initData(getSearch());
						}
					});
				}
			});
		}
	};

	$scope.delete = function (id, question, e) {
		e.stopPropagation();
		dialog.confirm('Apakah anda yakin akan menghapus pertanyaan \"' + question + '\"?', function (response) {
			if (response) {
				fetcher.deleteEssay(id, function (response) {
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
		fetcher.getAllEssay(_.omitBy({ limit: limit, like: like, offset: 0, category: $scope.category.id, startdate: moment($scope.startDate).format(globalVar.dateFormat), enddate: moment($scope.endDate).format(globalVar.dateFormat) }, _.isNil), function (response) {
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
				}).sortBy(['name']).unshift({ id: null, name: 'Semua' }).value();
				$scope.category = _.head($scope.categories);

				initData();
			}
		});
	};

	init();
}]);
//# sourceMappingURL=questionController.js.map
