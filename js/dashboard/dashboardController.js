app.controller('DashboardController', ['$scope', '$location', '$document', '$state', 'localStorageService', 'fetcher', function ($scope, $location, $document, $state, localStorageService, fetcher) {
    'use strict';

	$scope.menus		= [
		{ title: 'Statistik', icon: 'line-chart', state: 'statistic' },
		{ title: 'Daftar Pemain', icon: 'user', state: 'user' },
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


	let state			= $location.url().split('/')[1];
	$scope.active		= (state) ? state : _.chain($scope.menus).head().get('state').value();
	$scope.setActive	= (selected) => { $scope.active = selected; $state.go('dashboard.' + selected); }

	// $scope.showUserMenu	= true;
}]);
