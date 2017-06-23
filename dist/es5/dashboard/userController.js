'use strict';

app.controller('UserController', ['$scope', 'fetcher', '$timeout', function ($scope, fetcher, $timeout) {
	'use strict';

	var limit = 10;
	var iterate = 0;
	var typeDelay = 500;

	$scope.data = [];
	$scope.pauseAjx = false;
	$scope.doneAjx = false;

	$scope.loadMoar = function () {
		$scope.pauseAjx = true;
		iterate++;
		var data = _.omitBy({
			limit: limit,
			offset: iterate * limit,
			like: $scope.search ? $scope.search.length >= 3 ? $scope.search : null : null,
			orderby: $scope.orderby.value
		}, _.isNil);
		fetcher.getAllUser(data, function (response) {
			if (response.response == 'OK' && response.status_code == 200) {
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
		if (delayTimeout) $timeout.cancel(delayTimeout);

		delayTimeout = $timeout(function () {
			if (newVal !== oldVal && newVal.length >= 3) {
				init(newVal);
			} else if (newVal == '') {
				init();
			}
		}, typeDelay);
	});

	$scope.orderOptions = [{ title: 'name', value: 'usr_display_name', order: 'ASC' }, { title: 'designation', value: 'usr_designation', order: 'ASC' }, { title: 'village', value: 'usr_village', order: 'ASC' }, { title: 'age', value: 'usr_years', order: 'ASC' }, { title: 'score', value: 'usr_score', order: 'ASC' }, { title: 'contribution', value: 'usr_contribution', order: 'ASC' }];

	$scope.orderby = _.head($scope.orderOptions);
	$scope.selectSort = function (selected) {
		if ($scope.orderby.title == selected.title) {
			selected.order = selected.order == 'ASC' ? 'DESC' : 'ASC';
		} else {
			selected.order = 'ASC';
		}

		$scope.orderby = selected;

		init($scope.search ? $scope.search.length >= 3 ? $scope.search : null : null);
	};

	var init = function init(like) {
		$scope.pauseAjx = true;
		iterate = 0;
		fetcher.getAllUser(_.omitBy({ limit: limit, like: like, offset: 0, orderby: $scope.orderby.value + ' ' + $scope.orderby.order }, _.isNil), function (response) {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.data = response.result;
				if (response.result.length < limit) {
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
//# sourceMappingURL=userController.js.map
