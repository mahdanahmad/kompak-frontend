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

	$scope.startDate	= moment().year(2017).startOf('year').toDate();
	$scope.endDate		= moment().toDate();
	$scope.dateChange	= () => { init(); }
	$scope.downloadLink	= () => (fetcher.getFilesLink('userdata', _.omitBy({
		startdate: moment($scope.startDate).format(globalVar.dateFormat),
		enddate: moment($scope.endDate).format(globalVar.dateFormat),
		like: getSearch(),
		orderby: $scope.orderby.value + ' ' + $scope.orderby.order,
	}, _.isNil)));

	let getSearch	= () => ($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);

	$scope.openHint	= () => { dialog.notif(globalVar.userHint); }

	$scope.loadMoar	= () => {
		$scope.pauseAjx	= true;
		iterate++;
		let data = _.omitBy({
			limit,
			offset: iterate * limit,
			like: getSearch(),
			orderby: $scope.orderby.value + ' ' + $scope.orderby.order,
			startdate: moment($scope.startDate).format(globalVar.dateFormat),
			enddate: moment($scope.endDate).format(globalVar.dateFormat),
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

	$scope.toYear	= (birthyear) => ( birthyear < moment().format('YYYY') ? moment().diff(moment().year(birthyear), 'years') : null);

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
		{ title: 'nama', value: 'usr_display_name', order: 'ASC' },
		{ title: 'jabatan', value: 'usr_designation', order: 'ASC' },
		{ title: 'desa', value: 'usr_village', order: 'ASC' },
		{ title: 'umur', value: 'usr_year_born', order: 'ASC' },
		{ title: 'skor', value: 'usr_score', order: 'ASC' },
		{ title: 'kontribusi', value: 'usr_contribution', order: 'ASC' },
	];

	$scope.orderby		= _.head($scope.orderOptions);
	$scope.selectSort	= (selected) => {
		if ($scope.orderby.title == selected.title) {
			selected.order	= selected.order == 'ASC' ? 'DESC' : 'ASC';
		} else {
			selected.order	= 'ASC';
		}

		$scope.orderby = selected;

		init(getSearch());
	}

	$scope.newUser	= () => {
		dialog.userDialog({}, (dialResp) => {
			if (_.isObject(dialResp)) {
				fetcher.postUser(_.mapValues(dialResp, _.toString), (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						init(getSearch());
					}
				});
			}
		});
	};
	$scope.editUser	= (id) => {
		if ($scope.$parent.role) {
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
							init(getSearch());
						}
					});
				}
			});
		}
	};

	$scope.delete	= (id, name, e) => {
		e.stopPropagation();
		dialog.confirm('Apakah anda yakin akan menghapus ' + name + ' akun?', (response) => {
			if  (response) {
				fetcher.deleteUser(id, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						init(getSearch());
					}
				});
			}
		});
	}

	let init	= (like) => {
		$scope.pauseAjx	= true;
		$scope.nodata	= null;
		iterate	= 0;
		fetcher.getAllUser(_.omitBy({ limit, like, offset: 0, orderby: $scope.orderby.value + ' ' + $scope.orderby.order, startdate: moment($scope.startDate).format(globalVar.dateFormat), enddate: moment($scope.endDate).format(globalVar.dateFormat) }, _.isNil), (response) => {
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
