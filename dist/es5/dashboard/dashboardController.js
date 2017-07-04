'use strict';

app.controller('DashboardController', ['$scope', '$location', '$document', '$state', 'localStorageService', 'fetcher', function ($scope, $location, $document, $state, localStorageService, fetcher) {
	'use strict';

	$scope.menus = [{ title: 'Statistik', icon: 'line-chart', state: 'statistic' }, { title: 'Daftar Pemain', icon: 'user', state: 'user' }, { title: 'Pertanyaan Pilihan Ganda', icon: 'th-large', state: 'choices' }, { title: 'Jawaban Pilihan Ganda', icon: 'square', state: 'choicesAns' }, { title: 'Pertanyaan Essai', icon: 'pencil-square-o', state: 'essay' }, { title: 'Jawaban Essai', icon: 'file-text-o', state: 'essayAns' }, { title: 'Lokasi', icon: 'map-o', state: 'location' }, { title: 'Pengaturan', icon: 'cogs', state: 'misc' }];

	var state = $location.url().split('/')[1];
	$scope.active = state ? state : _.chain($scope.menus).head().get('state').value();
	$scope.setActive = function (selected) {
		$scope.active = selected;$state.go('dashboard.' + selected);
	};

	// $scope.showUserMenu	= true;
}]);
//# sourceMappingURL=dashboardController.js.map
