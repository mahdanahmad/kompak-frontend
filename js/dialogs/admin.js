app.controller('ModalAdminController', ['$scope', 'fetcher', function ($scope, fetcher) {
    'use strict';

	$scope.data			= $scope.ngDialogData.content || {};

	$scope.inputs	= [
		{ label: 'nama', model: 'name', tag: 'input', type: 'text', required: true },
		{ label: 'username', model: 'username', tag: 'input', type: 'text', required: true },
		{ label: 'email', model: 'email', tag: 'input', type: 'email', required: true },
		{ label: 'password', model: 'password', tag: 'input', type: 'password', required: true },
		{ label: 'role', model: 'role', tag: 'radio', value: [{ label: 'Only View', value: 0 }, { label: 'Can Edit', value: 1 }] },
	];
}]);
