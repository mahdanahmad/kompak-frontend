app.controller('DashboardController', ['$scope', '$location', '$document', '$state', 'localStorageService', 'fetcher', 'dialog', function ($scope, $location, $document, $state, localStorageService, fetcher, dialog) {
    'use strict';

	$scope.menus		= [
		{ title: 'Statistik', icon: 'line-chart', state: 'statistic' },
		{ title: 'Daftar Pemain', icon: 'user', state: 'user' },
		{ title: 'Daftar Admin', icon: 'gavel', state: 'admin' },
		{ title: 'Pertanyaan Pilihan Ganda', icon: 'th-large', state: 'choices' },
		{ title: 'Jawaban Pilihan Ganda', icon: 'square', state: 'choicesAns' },
		{ title: 'Pertanyaan Essai', icon: 'pencil-square-o', state: 'essay' },
		{ title: 'Jawaban Essai', icon: 'file-text-o', state: 'essayAns' },
		{ title: 'Lokasi', icon: 'map-o', state: 'location' },
		{ title: 'Pengaturan', icon: 'cogs', state: 'misc' },
		// { title: 'Category', icon: 'object-group', state: 'category' },
		// { title: 'Badge', icon: 'map-o', state: 'badge' },
		// { title: 'Institution', icon: 'university', state: 'institution' },
		// { title: 'Education', icon: 'graduation-cap', state: 'education' },
		// { title: 'Setting', icon: 'cogs', state: 'setting' },
	];


	$scope.active	= $location.url().split('/')[1];
	$scope.setActive	= (selected) => { $scope.active = selected; $state.go('dashboard.' + selected); }


	$scope.logout	= () => {
		localStorageService.remove('id', 'role');
		$state.go('auth');
	};

	$scope.editprofile	= () => {
		async.waterfall([
			(callback) => {
				fetcher.getAdmin(localStorageService.get('id'), (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						callback(null, response.result);
					} else {
						callback(response.message);
					}
				});
			},
			(adminData, callback) => {
				let before	= _.clone(adminData);
				dialog.profileDialog(adminData, (response) => {
					if (_.isObject(response) && !_.isEqual(before, response)) {
						callback(null, _.pick(response, ['name', 'username', 'email', 'newpassword']));
					} else {
						callback(null);
					}
				});
			}
		], (err, result) => {
			if (err) { console.log(err); }

			if (result) {
				if (!_.isEmpty(result.newpassword)) { result.password = CryptoJS.SHA256(result.newpassword).toString(); }
				fetcher.putAdmin(localStorageService.get('id'), result, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						dialog.notif('data anda berhasil diperbarui.')
					} else if (response.message == "Duplicate primary key(s). Please check again your input.") {
						dialog.error("Pengubahan data gagal, username sudah terpakai.");
					} else {
						dialog.error(response.message);
					}
				});
			}
		})
	}

	let init	= () => {
		fetcher.getAdmin(localStorageService.get('id'), (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.username	= response.result.username;
				$scope.role		= response.result.role;
			}
		});
	}
	init();
}]);
