app.controller('ModalCategoryController', ['$scope', function ($scope) {
    'use strict';

	$scope.data			= $scope.ngDialogData.content || {};
	$scope.data.category_enabled	= ($scope.data.category_enabled == 1 || false);

	$scope.inputs	= [
		{ label: 'nama', model: 'category_name', tag: 'input', type: 'text', required: true },
		{ label: 'deskripsi', model: 'category_description', tag: 'textarea' },
		{ label: 'aktifkan kategori', model: 'category_enabled', tag: 'checkbox' },
	];

}]);
