app.controller('AuthController', ['$scope', '$state', 'localStorageService', 'fetcher', function ($scope, $state, localStorageService, fetcher) {
    'use strict';

	$scope.username	= localStorageService.get('username');

	$scope.signin	= () => {
		let data	= { username: $scope.username, password: CryptoJS.SHA256($scope.password).toString() }
		fetcher.postAuth(data, (response) => {
			$scope.errmessage	= "";
			if (response.response == 'OK' && response.status_code == 200) {
				localStorageService.set('id', response.result.id);
				localStorageService.set('username', $scope.username);

				$state.go('dashboard.statistic');
			} else {
				$scope.errmessage	= response.message;
			}
		});
	}
}]);
