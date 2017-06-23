'use strict';

app.controller('DashboardController', ['$scope', '$location', '$document', '$state', 'localStorageService', 'fetcher', function ($scope, $location, $document, $state, localStorageService, fetcher) {
	'use strict';

	$scope.menus = [{ title: 'Statistic', icon: 'line-chart', state: 'statistic' }, { title: 'User', icon: 'user', state: 'user' }, { title: 'Choices\' Question', icon: 'th-large', state: 'choices' }, { title: 'Choices\' Answer', icon: 'square', state: 'choicesAns' }, { title: 'Essay\'s Question', icon: 'pencil-square-o', state: 'essay' }, { title: 'Essay\'s Answer', icon: 'file-text-o', state: 'essayAns' }, { title: 'Location', icon: 'map-o', state: 'location' }, { title: 'Miscellaneous', icon: 'cogs', state: 'misc' }];

	var state = $location.url().split('/')[1];
	$scope.active = state ? state : _.chain($scope.menus).head().get('state').value();
	$scope.setActive = function (selected) {
		$scope.active = selected;$state.go('dashboard.' + selected);
	};

	// $scope.showUserMenu	= true;
}]);
//# sourceMappingURL=dashboardController.js.map
