'use strict';

app.controller('EssayAnsController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, dialog, globalVar) {
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

	var getSearch = function getSearch() {
		return $scope.search ? $scope.search.length >= 3 ? $scope.search : null : null;
	};

	$scope.toDate = function (stringDate) {
		return moment(stringDate).format("dddd, MMMM Do YYYY, h:mm a");
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
		fetcher.getAllEssayAns(data, function (response) {
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

	$scope.delete = function (id, name, e) {
		e.stopPropagation();
		dialog.confirm('Are you sure you wanna delete an answer by ' + name + '?', function (response) {
			if (response) {
				fetcher.deleteEssayAns(id, function (response) {
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
		fetcher.getAllEssayAns(_.omitBy({ limit: limit, like: like, offset: 0, category: $scope.category.id }, _.isNil), function (response) {
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
//# sourceMappingURL=answerController.js.map
