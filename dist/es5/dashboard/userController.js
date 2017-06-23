'use strict';

app.controller('UserController', ['$scope', 'fetcher', function ($scope, fetcher) {
	'use strict';

	$scope.sortOptions = [{ title: 'name', value: 'usr_display_name' }, { title: 'designation', value: 'usr_designation' }, { title: 'province', value: 'usr_province' }, { title: 'age', value: 'usr_years' }, { title: 'score', value: 'usr_score' }, { title: 'contribution', value: 'usr_contribution' }];

	$scope.sortby = _.head($scope.sortOptions);
	$scope.selectSort = function (selected) {
		$scope.sortby = selected;
	};
}]);
//# sourceMappingURL=userController.js.map
