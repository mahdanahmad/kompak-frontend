app.controller('ModalProfileController', ['$scope', 'fetcher', function ($scope, fetcher) {
    'use strict';

	$scope.data			= $scope.ngDialogData.content || {};

	$scope.inputs	= [
		{ label: 'nama', model: 'name', tag: 'input', type: 'text', required: true },
		{ label: 'username', model: 'username', tag: 'input', type: 'text', required: true },
		{ label: 'email', model: 'email', tag: 'input', type: 'email', required: true },
		{ label: 'password baru', model: 'newpassword', tag: 'input', type: 'password' },
	];
}]);
