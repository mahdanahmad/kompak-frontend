app.controller('LogsController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, dialog, globalVar) {
    'use strict';

	let limit		= 15;
	let iterate		= 0;
	let typeDelay	= 500;

	$scope.data		= [];
	$scope.pauseAjx	= false;
	$scope.doneAjx	= false;

	$scope.search	= "";
	$scope.nodata	= null;
	$scope.loading	= globalVar.loading;

	let getSearch	= () => ($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);

	$scope.openHint	= () => { dialog.notif(globalVar.logsHint); }
	$scope.toDate	= (stringDate) => (moment(stringDate).format("dddd, Do MMMM YYYY, hh:mm"));

	$scope.stateOptions	= [
		{ title: 'semua', value: null },
		{ title: 'insert', value: 'INSERT' },
		{ title: 'update', value: 'UPDATE' },
		{ title: 'delete', value: 'DELETE' },
	];
	$scope.state		= _.head($scope.stateOptions);
	$scope.selectState	= (selected) => { $scope.state = selected; init(getSearch()); }

	$scope.loadMoar	= () => {
		$scope.pauseAjx	= true;
		iterate++;
		let data = _.omitBy({
			limit,
			offset: iterate * limit,
			like: getSearch(),
			category: $scope.category.id
		}, _.isNil);
		fetcher.getLogs(data, (response) => {
			if (response.response == 'OK' && response.status_code == 200 && response.result) {
				if (response.result.length < limit) { $scope.doneAjx = true; }
				$scope.data 	= _.concat($scope.data, response.result);
			} else {
				$scope.doneAjx	= true;
			}
			$scope.pauseAjx	= false;
		});
	};

	let delayTimeout;
	$scope.$watch('search', (newVal, oldVal) => {
		if (!_.isNil(newVal) && newVal !== oldVal) {
			if (delayTimeout) $timeout.cancel(delayTimeout);

			delayTimeout	= $timeout(() => {
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

	let init = (like) => {
		$scope.pauseAjx	= true;
		$scope.nodata	= null;
		iterate	= 0;
		fetcher.getLogs(_.omitBy({ limit, like, offset: 0, state: $scope.state.value }, _.isNil), (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.data	= response.result;
				if (!response.result || response.result.length == 0) {
					$scope.nodata = globalVar.nodata; $scope.doneAjx = true;
				} else  if (response.result.length < limit) {
					$scope.doneAjx = true;
				} else {
					$scope.doneAjx	= false;
				}
				$scope.pauseAjx	= false;
			}
		});
	}

	init();
}]);
