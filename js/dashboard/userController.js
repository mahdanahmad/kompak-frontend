app.controller('UserController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, dialog, globalVar) {
    'use strict';

	let limit		= 10;
	let iterate		= 0;
	let typeDelay	= 500;

	$scope.search	= "";
	$scope.nodata	= null;

	$scope.data		= [];
	$scope.pauseAjx	= false;
	$scope.doneAjx	= false;

	$scope.loadMoar	= () => {
		$scope.pauseAjx	= true;
		iterate++;
		let data = _.omitBy({
			limit,
			offset: iterate * limit,
			like: $scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null,
			orderby: $scope.orderby.value + ' ' + $scope.orderby.order,
		}, _.isNil);
		fetcher.getAllUser(data, (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				if (response.result.length < limit) { $scope.doneAjx = true; }
				$scope.data 	= _.concat($scope.data, response.result);
			} else {
				$scope.doneAjx	= true;
			}
			$scope.pauseAjx	= false;
		});
	}

	let delayTimeout;
	$scope.$watch('search', (newVal, oldVal) => {
		if (!_.isNil(newVal)) {
			if (delayTimeout) $timeout.cancel(delayTimeout);

			delayTimeout	= $timeout(() => {
				if (newVal !== oldVal && newVal.length >= 3) {
					init(newVal);
				} else if (newVal == '') {
					init();
				}
			}, typeDelay);
		} else {
			$scope.search = '';
		}
	});

	$scope.orderOptions	= [
		{ title: 'name', value: 'usr_display_name', order: 'ASC' },
		{ title: 'designation', value: 'usr_designation', order: 'ASC' },
		{ title: 'village', value: 'usr_village', order: 'ASC' },
		{ title: 'age', value: 'usr_years', order: 'ASC' },
		{ title: 'score', value: 'usr_score', order: 'ASC' },
		{ title: 'contribution', value: 'usr_contribution', order: 'ASC' },
	];

	$scope.orderby		= _.head($scope.orderOptions);
	$scope.selectSort	= (selected) => {
		if ($scope.orderby.title == selected.title) {
			selected.order	= selected.order == 'ASC' ? 'DESC' : 'ASC';
		} else {
			selected.order	= 'ASC';
		}

		$scope.orderby = selected;

		init($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);
	}

	$scope.newUser	= () => {
		dialog.userDialog({}, (dialResp) => {
			fetcher.postUser(dialResp, (response) => {
				if (response.response == 'OK' && response.status_code == 200) {
					init($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);
				}
			});
		});
	};
	$scope.editUser	= (id) => {
		console.log('edit user by id');
	};

	let init	= (like) => {
		$scope.pauseAjx	= true;
		$scope.nodata	= null;
		iterate	= 0;
		fetcher.getAllUser(_.omitBy({ limit, like, offset: 0, orderby: $scope.orderby.value + ' ' + $scope.orderby.order }, _.isNil), (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.data	= response.result;
				if (!response.result) {
					$scope.nodata = globalVar.nodata;
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
