'use strict';

app.controller('AdminController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', 'localStorageService', function ($scope, fetcher, $timeout, dialog, globalVar, localStorageService) {
	'use strict';

	var limit = 10;
	var iterate = 0;
	var typeDelay = 500;

	$scope.search = "";
	$scope.nodata = null;
	$scope.loading = globalVar.loading;

	$scope.data = [];
	$scope.pauseAjx = false;
	$scope.doneAjx = false;

	$scope.openHint = function () {
		dialog.notif(globalVar.adminHint);
	};

	$scope.loadMoar = function () {
		$scope.pauseAjx = true;
		iterate++;
		var data = _.omitBy({
			limit: limit,
			offset: iterate * limit,
			like: $scope.search ? $scope.search.length >= 3 ? $scope.search : null : null,
			orderby: $scope.orderby.value + ' ' + $scope.orderby.order
		}, _.isNil);
		fetcher.getAllAdmin(data, function (response) {
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

	$scope.newAdmin = function () {
		dialog.adminDialog({}, function (dialResp) {
			if (_.isObject(dialResp)) {
				dialResp.password = CryptoJS.SHA256(dialResp.password).toString();
				fetcher.postAdmin(dialResp, function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						init($scope.search ? $scope.search.length >= 3 ? $scope.search : null : null);
					} else if (response.message == "Duplicate primary key(s). Please check again your input.") {
						dialog.error("Penambahan data gagal, username sudah terpakai.");
					}
				});
			}
		});
	};
	$scope.editAdmin = function (o) {
		if ($scope.$parent.role) {
			var before = _.clone(o);
			dialog.adminDialog(before, function (dialResp) {
				if (_.isObject(dialResp) && !_.isEqual(o, dialResp)) {
					fetcher.putAdmin(o.id, dialResp, function (response) {
						if (response.response == 'OK' && response.status_code == 200) {
							init($scope.search ? $scope.search.length >= 3 ? $scope.search : null : null);
						} else if (response.message == "Duplicate primary key(s). Please check again your input.") {
							dialog.error("Pengubahan data gagal, username sudah terpakai.");
						}
					});
				}
			});
		}
	};

	$scope.delete = function (id, name, e) {
		e.stopPropagation();
		dialog.confirm('Apakah anda yakin akan menghapus ' + name + ' akun?', function (response) {
			if (response) {
				fetcher.deleteAdmin(id, function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						if (id == localStorageService.get('id')) {
							$scope.$parent.logout();
						} else {
							init($scope.search ? $scope.search.length >= 3 ? $scope.search : null : null);
						}
					}
				});
			}
		});
	};

	var init = function init(like) {
		$scope.pauseAjx = true;
		$scope.nodata = null;
		iterate = 0;
		fetcher.getAllAdmin(_.omitBy({ limit: limit, like: like, offset: 0 }, _.isNil), function (response) {
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

	init();
}]);
//# sourceMappingURL=adminController.js.map
