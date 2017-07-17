app.controller('AdminController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', 'localStorageService', function ($scope, fetcher, $timeout, dialog, globalVar, localStorageService) {
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

	$scope.openHint	= () => { dialog.notif(globalVar.adminHint); }

	$scope.loadMoar	= () => {
		$scope.pauseAjx	= true;
		iterate++;
		let data = _.omitBy({
			limit,
			offset: iterate * limit,
			like: $scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null,
			orderby: $scope.orderby.value + ' ' + $scope.orderby.order,
		}, _.isNil);
		fetcher.getAllAdmin(data, (response) => {
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

	$scope.newAdmin	= () => {
		dialog.adminDialog({}, (dialResp) => {
			if (_.isObject(dialResp)) {
				dialResp.password	= CryptoJS.SHA256(dialResp.password).toString();
				fetcher.postAdmin(dialResp, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						init($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);
					} else if (response.message == "Duplicate primary key(s). Please check again your input.") {
						dialog.error("Penambahan data gagal, username sudah terpakai.");
					}
				});
			}
		});
	};
	$scope.editAdmin	= (o) => {
		if ($scope.$parent.role) {
			let before	= _.clone(o);
			dialog.adminDialog(before, (dialResp) => {
				if (_.isObject(dialResp) && !_.isEqual(o, dialResp)) {
					fetcher.putAdmin(o.id, dialResp, (response) => {
						if (response.response == 'OK' && response.status_code == 200) {
							init($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);
						} else if (response.message == "Duplicate primary key(s). Please check again your input.") {
							dialog.error("Pengubahan data gagal, username sudah terpakai.");
						}
					});
				}
			});
		}
	};

	$scope.delete	= (id, name, e) => {
		e.stopPropagation();
		dialog.confirm('Apakah anda yakin akan menghapus ' + name + ' akun?', (response) => {
			if (response) {
				fetcher.deleteAdmin(id, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						if (id == localStorageService.get('id')) {
							$scope.$parent.logout();
						} else {
							init($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);
						}
					}
				});
			}
		});
	}

	let init	= (like) => {
		$scope.pauseAjx	= true;
		$scope.nodata	= null;
		iterate	= 0;
		fetcher.getAllAdmin(_.omitBy({ limit, like, offset: 0 }, _.isNil), (response) => {
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
