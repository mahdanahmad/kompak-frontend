'use strict';

app.controller('LogsController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, dialog, globalVar) {
	'use strict';

	var limit = 15;
	var iterate = 0;
	var typeDelay = 500;

	$scope.data = [];
	$scope.pauseAjx = false;
	$scope.doneAjx = false;

	$scope.search = "";
	$scope.nodata = null;
	$scope.loading = globalVar.loading;

	var getSearch = function getSearch() {
		return $scope.search ? $scope.search.length >= 3 ? $scope.search : null : null;
	};

	$scope.openHint = function () {
		dialog.notif(globalVar.choicesHint);
	};
	$scope.toDate = function (stringDate) {
		return moment(stringDate).format("dddd, Do MMMM YYYY, hh:mm");
	};

	$scope.stateOptions = [{ title: 'semua', value: null }, { title: 'insert', value: 'INSERT' }, { title: 'update', value: 'UPDATE' }, { title: 'delete', value: 'DELETE' }];
	$scope.state = _.head($scope.stateOptions);
	$scope.selectState = function (selected) {
		$scope.state = selected;init(getSearch());
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
		fetcher.getLogs(data, function (response) {
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
					init(newVal);
				} else if (newVal == '' && !$scope.pauseAjx) {
					init();
				}
			}, typeDelay);
		} else {
			$scope.search = '';
		}
	});

	var init = function init(like) {
		$scope.pauseAjx = true;
		$scope.nodata = null;
		iterate = 0;
		fetcher.getLogs(_.omitBy({ limit: limit, like: like, offset: 0, state: $scope.state.value }, _.isNil), function (response) {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.data = response.result;
				if (!response.result || response.result.length == 0) {
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

	init();
}]);
//# sourceMappingURL=logsController.js.map
