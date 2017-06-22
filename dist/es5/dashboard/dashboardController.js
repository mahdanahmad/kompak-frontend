'use strict';

app.controller('DashboardController', ['$scope', '$location', '$document', 'localStorageService', 'fetcher', function ($scope, $location, $document, localStorageService, fetcher) {
	'use strict';

	var _this = this;

	$scope.menus = [{ title: 'Statistic', icon: 'line-chart', state: 'statistic' }, { title: 'Users', icon: 'users', state: 'users' }, { title: 'Multiple Choices', icon: 'th-large', state: 'choices' }, { title: 'Choices\' Answer', icon: 'square', state: 'choicesAns' }, { title: 'Essay', icon: 'pencil-square-o', state: 'essay' }, { title: 'Essay\'s Answer', icon: 'file-text-o', state: 'essayAns' }, { title: 'Category', icon: 'object-group', state: 'category' }, { title: 'Location', icon: 'map-o', state: 'location' }, { title: 'Miscellaneous', icon: 'cogs', state: 'misc' }];

	$scope.active = _.chain($scope.menus).head().get('state').value();
	$scope.setActive = function (selected) {
		$scope.active = selected;
	};

	$scope.showUserMenu = false;
	$scope.openDropdown = function ($event) {
		$event.stopPropagation();
		if (!$scope.showUserMenu) {
			var closeOnOther = function closeOnOther() {
				$scope.showUserMenu = false;
				$document.unbind('click', _this);
			};

			$document.bind('click', function (e) {
				$scope.$apply(function () {
					closeOnOther();
				});
			});
			$scope.showUserMenu = true;
		} else {
			$scope.showUserMenu = false;
		}
	};
}]);
//# sourceMappingURL=dashboardController.js.map
