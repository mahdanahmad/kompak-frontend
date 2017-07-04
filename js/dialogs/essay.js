app.controller('ModalEssayController', ['$scope', function ($scope) {
    'use strict';

	$scope.data			= $scope.ngDialogData.content.data || {};
	$scope.inputs	= [
		{ label: 'pertanyaan essai', model: 'question', tag: 'textarea', required: true },
		{ label: 'kategori', model: 'ID_category', tag: 'select', value: _.omitBy($scope.ngDialogData.content.categories, (o) => (_.isNil(o.id))), required: true },
	];

}]);
