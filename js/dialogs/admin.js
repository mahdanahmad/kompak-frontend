app.controller('ModalAdminController', ['$scope', 'fetcher', function ($scope, fetcher) {
    'use strict';

	$scope.data			= $scope.ngDialogData.content || {};
	$scope.data.role	= $scope.ngDialogData.content.role || [];

	$scope.roles		= ['role 1', 'role 2', 'role 3'];
	$scope.checkActive	= (o) => (_.includes($scope.data.role, o));
	$scope.toggleActive	= (o) => {
		if (_.includes($scope.data.role, o)) {
			_.pull($scope.data.role, o);
		} else {
			$scope.data.role.push(o);
		}
	};

	$scope.inputs	= [
		{ label: 'nama', model: 'name', tag: 'input', type: 'text', required: true },
		{ label: 'username', model: 'username', tag: 'input', type: 'text', required: true },
		{ label: 'email', model: 'email', tag: 'input', type: 'email', required: true },
		{ label: 'password', model: 'password', tag: 'input', type: 'password', required: true },
		{ label: 'role', model: 'role', tag: 'roles' },
	];
}]);
