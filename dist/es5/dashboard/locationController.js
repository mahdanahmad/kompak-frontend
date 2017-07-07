'use strict';

app.controller('LocationController', ['$scope', 'fetcher', '$timeout', '$state', '$stateParams', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, $state, $stateParams, dialog, globalVar) {
	'use strict';

	var limit = 20;
	var iterate = 0;
	var typeDelay = 500;

	var id = '';
	var defId = '';
	var prevState = '';

	// let hint		= '<i class="fa fa-question-circle-o cursor-pointer" aria-hidden="true"><md-tooltip md-autohide="true">petunjuk penggunaan halaman</md-tooltip></i>';
	$scope.locMap = { province: 'provinsi', regency: 'kabupaten', district: 'kecamatan', village: 'desa' };

	$scope.openHint = function () {
		dialog.notif(globalVar.locationHint);
	};

	switch (true) {
		case !_.isNil($stateParams.province) && !_.isNil($stateParams.regency) && !_.isNil($stateParams.district):
			id = $stateParams.province + '/' + $stateParams.regency + '/' + $stateParams.district + '/';
			$scope.state = 'village';defId = $stateParams.district;prevState = 'district';
			break;
		case !_.isNil($stateParams.province) && !_.isNil($stateParams.regency):
			id = $stateParams.province + '/' + $stateParams.regency + '/';
			$scope.state = 'district';defId = $stateParams.regency;prevState = 'regency';
			break;
		case !_.isNil($stateParams.province):
			id = $stateParams.province + '/';
			$scope.state = 'regency';defId = $stateParams.province;prevState = 'province';
			break;
		default:
			$scope.state = 'province';
	}

	$scope.data = [];
	$scope.pauseAjx = false;
	$scope.doneAjx = false;

	$scope.search = "";
	$scope.nodata = null;
	$scope.loading = globalVar.loading;

	$scope.gotoLocation = function (id) {
		var newLocation = {};
		newLocation[$scope.state] = id;

		$state.go('dashboard.location', _.assign({}, _.omit($stateParams, ['#']), newLocation));
	};

	$scope.backLocation = function () {
		var currentLocation = {};
		currentLocation[prevState] = null;

		$state.go('dashboard.location', _.assign({}, _.omit($stateParams, ['#']), currentLocation));
	};

	var getSearch = function getSearch() {
		return $scope.search ? $scope.search.length >= 3 ? $scope.search : null : null;
	};

	var mapName = function mapName(data) {
		return _.chain(data).map(function (o) {
			return _.chain(o).pickBy(function (d, key) {
				return _.includes(['id'], key) || _.startsWith(key, 'name');
			}).mapKeys(function (d, key) {
				return key == 'id' ? 'id' : 'name';
			}).value();
		}).value();
	};

	$scope.loadMoar = function () {
		$scope.pauseAjx = true;
		iterate++;
		var data = _.omitBy({
			limit: limit,
			offset: iterate * limit,
			like: getSearch()
		}, _.isNil);
		fetcher.getLocation(id, data, function (response) {
			if (response.response == 'OK' && response.status_code == 200 && response.result.data) {
				if (response.result.data.length < limit) {
					$scope.doneAjx = true;
				}
				$scope.data = _.concat($scope.data, mapName(response.result.data));
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

	$scope.newLocation = function () {
		dialog.locationDialog({ state: $scope.locMap[$scope.state], isNew: true, data: { id: defId } }, function (dialResp) {
			if (_.isObject(dialResp)) {
				fetcher.postLocation(id, _.mapValues(dialResp, _.toString), function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						init(getSearch());
					} else {
						dialog.error(response.message);
					}
				});
			}
		});
	};
	$scope.edit = function (o, e) {
		e.stopPropagation();
		dialog.locationDialog({ state: $scope.locMap[$scope.state], isNew: false, data: _.clone(o) }, function (dialResp) {
			if (_.isObject(dialResp)) {
				fetcher.putLocation(id + o.id, _.mapValues(dialResp, _.toString), function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						init(getSearch());
					} else {
						dialog.error(response.message);
					}
				});
			}
		});
	};

	$scope.delete = function (locId, location, e) {
		e.stopPropagation();
		dialog.confirm('Apakah anda yakin akan menghapus \"' + location + '\"?', function (response) {
			if (response) {
				fetcher.deleteLocation(id + locId, function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						init(getSearch());
					} else {
						dialog.error(response.message);
					}
				});
			}
		});
	};

	var init = function init(like) {
		$scope.pauseAjx = true;
		$scope.nodata = null;
		iterate = 0;
		fetcher.getLocation(id, _.omitBy({ limit: limit, like: like, offset: 0 }, _.isNil), function (response) {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.title = $scope.state == 'province' ? '<span>semua</span> provinsi' : $scope.locMap[$scope.state] + ' <span>di ' + response.result.name + '</span>';
				$scope.data = mapName(response.result.data);
				if (!response.result.data) {
					$scope.nodata = globalVar.nodata;$scope.doneAjx = true;
				} else if (response.result.data.length < limit) {
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
//# sourceMappingURL=locationController.js.map
