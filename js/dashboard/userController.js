app.controller('UserController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, dialog, globalVar) {
    'use strict';

	let limit		= 10;
	let iterate		= 0;
	let typeDelay	= 500;

	$scope.search	= "";
	$scope.nodata	= null;
	$scope.loading	= globalVar.loading;

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
			if (response.response == 'OK' && response.status_code == 200 && response.result) {
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
			if (_.isObject(dialResp)) {
				fetcher.postUser(_.mapValues(dialResp, _.toString), (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						init($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);
					}
				});
			}
		});
	};
	$scope.editUser	= (id) => {
		async.waterfall([
			(callback) => {
				fetcher.getUser(id, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						callback(null, response.result);
					} else {
						callback(response.message);
					}
				});
			},
			(userData, callback) => {
				let before	= _.clone(userData);
				dialog.userDialog(userData, (response) => {
					if (_.isObject(response) && !_.isEqual(before, response)) {
						callback(null, response);
					} else {
						callback(null);
					}
				});
			}
		], (err, result) => {
			if (err) { console.log(err); }

			if (result) {
				fetcher.putUser(result.ID, _.chain(result).mapValues(_.toString).omit(['last_logged_in', 'usr_score']).value(), (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						init($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);
					}
				});
			}
		});
	};

	$scope.emailTo	= (id, name, e) => {
		e.stopPropagation();
	}
	$scope.delete	= (id, name, e) => {
		e.stopPropagation();
		dialog.confirm('Are you sure you wanna delete ' + name + '\'s account?', (response) => {
			if  (response) {
				fetcher.deleteUser(id, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						init($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);
					}
				});
			}
		});
	}

	let init	= (like) => {
		$scope.pauseAjx	= true;
		$scope.nodata	= null;
		iterate	= 0;
		fetcher.getAllUser(_.omitBy({ limit, like, offset: 0, orderby: $scope.orderby.value + ' ' + $scope.orderby.order }, _.isNil), (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.data	= response.result;
				if (!response.result) {
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
