app.controller('DashboardController', ['$scope', '$location', '$document', 'localStorageService', 'fetcher', function ($scope, $location, $document, localStorageService, fetcher) {
    'use strict';

	$scope.menus		= [
		{ title: 'Statistic', icon: 'line-chart', state: 'statistic' },
		{ title: 'Users', icon: 'users', state: 'users' },
		{ title: 'Multiple Choices', icon: 'th-large', state: 'choices' },
		{ title: 'Choices\' Answer', icon: 'square', state: 'choicesAns' },
		{ title: 'Essay', icon: 'pencil-square-o', state: 'essay' },
		{ title: 'Essay\'s Answer', icon: 'file-text-o', state: 'essayAns' },
		{ title: 'Category', icon: 'object-group', state: 'category' },
		{ title: 'Location', icon: 'map-o', state: 'location' },
		{ title: 'Miscellaneous', icon: 'cogs', state: 'misc' },
		// { title: 'Badge', icon: 'map-o', state: 'badge' },
		// { title: 'Institution', icon: 'university', state: 'institution' },
		// { title: 'Education', icon: 'graduation-cap', state: 'education' },
		// { title: 'Setting', icon: 'cogs', state: 'setting' },
	];

	$scope.active		= _.chain($scope.menus).head().get('state').value();
	$scope.setActive	= (selected) => { $scope.active = selected; }

	$scope.showUserMenu	= false;
	$scope.openDropdown = ($event) => {
		$event.stopPropagation();
		if (!$scope.showUserMenu) {
			let closeOnOther	= () => {
				$scope.showUserMenu	= false;
				$document.unbind('click', this);
			};

			$document.bind('click', (e) => { $scope.$apply(() => { closeOnOther(); }); });
			$scope.showUserMenu	= true;
		} else {
			$scope.showUserMenu	= false;
		}
	}
}]);
