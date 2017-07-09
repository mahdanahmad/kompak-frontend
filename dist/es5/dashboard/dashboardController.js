'use strict';

app.controller('DashboardController', ['$scope', '$location', '$document', '$state', 'localStorageService', 'fetcher', 'dialog', function ($scope, $location, $document, $state, localStorageService, fetcher, dialog) {
	'use strict';

	$scope.menus = [{ title: 'Statistik', icon: 'line-chart', state: 'statistic' }, { title: 'Daftar Pemain', icon: 'user', state: 'user' }, { title: 'Daftar Admin', icon: 'gavel', state: 'admin' }, { title: 'Pertanyaan Pilihan Ganda', icon: 'th-large', state: 'choices' }, { title: 'Jawaban Pilihan Ganda', icon: 'square', state: 'choicesAns' }, { title: 'Pertanyaan Essai', icon: 'pencil-square-o', state: 'essay' }, { title: 'Jawaban Essai', icon: 'file-text-o', state: 'essayAns' }, { title: 'Lokasi', icon: 'map-o', state: 'location' }, { title: 'Pengaturan', icon: 'cogs', state: 'misc' }];

	$scope.active = $location.url().split('/')[1];
	$scope.setActive = function (selected) {
		$scope.active = selected;$state.go('dashboard.' + selected);
	};

	$scope.logout = function () {
		localStorageService.remove('id', 'role');
		$state.go('auth');
	};

	$scope.editprofile = function () {
		async.waterfall([function (callback) {
			fetcher.getAdmin(localStorageService.get('id'), function (response) {
				if (response.response == 'OK' && response.status_code == 200) {
					callback(null, response.result);
				} else {
					callback(response.message);
				}
			});
		}, function (adminData, callback) {
			var before = _.clone(adminData);
			dialog.profileDialog(adminData, function (response) {
				if (_.isObject(response) && !_.isEqual(before, response)) {
					callback(null, _.pick(response, ['name', 'username', 'email', 'newpassword']));
				} else {
					callback(null);
				}
			});
		}], function (err, result) {
			if (err) {
				console.log(err);
			}

			if (result) {
				if (!_.isEmpty(result.newpassword)) {
					result.password = CryptoJS.SHA256(result.newpassword).toString();
				}
				fetcher.putAdmin(localStorageService.get('id'), result, function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						dialog.notif('data anda berhasil diperbarui.');
					} else if (response.message == "Duplicate primary key(s). Please check again your input.") {
						dialog.error("Pengubahan data gagal, username sudah terpakai.");
					} else {
						dialog.error(response.message);
					}
				});
			}
		});
	};

	var init = function init() {
		fetcher.getAdmin(localStorageService.get('id'), function (response) {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.username = response.result.username;
				$scope.role = response.result.role;
			}
		});
	};
	init();
}]);
//# sourceMappingURL=dashboardController.js.map
