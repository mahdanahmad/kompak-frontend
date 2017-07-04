app.controller('LocationController', ['$scope', 'fetcher', '$timeout', '$state', '$stateParams', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, $state, $stateParams, dialog, globalVar) {
    'use strict';

	let limit		= 20;
	let iterate		= 0;
	let typeDelay	= 500;

	let id			= '';
	let defId		= '';
	let prevState	= '';

	$scope.locMap	= { province : 'provinsi', regency: 'kabupaten', district: 'kecamatan', village: 'desa' };

	switch (true) {
		case !_.isNil($stateParams.province) && !_.isNil($stateParams.regency) && !_.isNil($stateParams.district):
			id	= $stateParams.province + '/' + $stateParams.regency + '/' + $stateParams.district + '/';
			$scope.state	= 'village'; defId = $stateParams.district; prevState = 'district';
			break;
		case !_.isNil($stateParams.province) && !_.isNil($stateParams.regency):
			id	= $stateParams.province + '/' + $stateParams.regency + '/';
			$scope.state	= 'district'; defId = $stateParams.regency; prevState = 'regency';
			break;
		case !_.isNil($stateParams.province):
			id	= $stateParams.province + '/';
			$scope.state	= 'regency';  defId = $stateParams.province; prevState = 'province';
			break;
		default:
			$scope.state	= 'province';
	}

	$scope.data		= [];
	$scope.pauseAjx	= false;
	$scope.doneAjx	= false;

	$scope.search	= "";
	$scope.nodata	= null;
	$scope.loading	= globalVar.loading;

	$scope.gotoLocation	= (id) => {
		let newLocation	= { };
		newLocation[$scope.state]	= id;

		$state.go('dashboard.location', _.assign({}, _.omit($stateParams, ['#']), newLocation));
	}

	$scope.backLocation	= () => {
		let currentLocation	= { };
		currentLocation[prevState]	= null;

		$state.go('dashboard.location', _.assign({}, _.omit($stateParams, ['#']), currentLocation));
	}

	let getSearch	= () => ($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);

	let mapName	= (data) => (
		_.chain(data).map((o) => (
			_.chain(o).pickBy((d, key) => ( _.includes(['id'], key) || _.startsWith(key, 'name') )).mapKeys((d, key) => (key == 'id' ? 'id' : 'name')).value()
		)).value()
	);

	$scope.loadMoar	= () => {
		$scope.pauseAjx	= true;
		iterate++;
		let data = _.omitBy({
			limit,
			offset: iterate * limit,
			like: getSearch()
		}, _.isNil);
		fetcher.getLocation(id, data, (response) => {
			if (response.response == 'OK' && response.status_code == 200 && response.result.data) {
				if (response.result.data.length < limit) { $scope.doneAjx = true; }
				$scope.data 	= _.concat($scope.data, mapName(response.result.data));
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

	$scope.newLocation	= () => {
		dialog.locationDialog({ state: $scope.locMap[$scope.state], isNew: true, data: { id: defId } }, (dialResp) => {
			if (_.isObject(dialResp)) {
				fetcher.postLocation(id, _.mapValues(dialResp, _.toString), (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						init(getSearch());
					} else {
						dialog.error(response.message);
					}
				});
			}
		});
	};
	$scope.edit	= (o, e) => {
		e.stopPropagation();
		dialog.locationDialog({ state: $scope.locMap[$scope.state], isNew: false, data: _.clone(o) }, (dialResp) => {
			if (_.isObject(dialResp)) {
				fetcher.putLocation(id + o.id, _.mapValues(dialResp, _.toString), (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						init(getSearch());
					} else {
						dialog.error(response.message);
					}
				});
			}
		});
	};

	$scope.delete	= (locId, location, e) => {
		e.stopPropagation();
		dialog.confirm('Apakah anda yakin akan menghapus \"' + location + '\"?', (response) => {
			if (response) {
				fetcher.deleteLocation(id + locId, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						init(getSearch());
					} else {
						dialog.error(response.message);
					}
				});
			}
		});
	}

	let init = (like) => {
		$scope.pauseAjx	= true;
		$scope.nodata	= null;
		iterate	= 0;
		fetcher.getLocation(id, _.omitBy({ limit, like, offset: 0 }, _.isNil), (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.title	= $scope.state == 'province' ? '<span>semua</span> provinsi' : ($scope.locMap[$scope.state] + ' <span>di ' + response.result.name + '</span>');
				$scope.data		= mapName(response.result.data);
				if (!response.result.data) {
					$scope.nodata = globalVar.nodata; $scope.doneAjx = true;
				} else if (response.result.data.length < limit) {
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
