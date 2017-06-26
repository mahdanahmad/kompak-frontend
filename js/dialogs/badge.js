app.controller('ModalBadgeController', ['$scope', function ($scope) {
    'use strict';

	$scope.data			= $scope.ngDialogData.content || {};

	$scope.inputs	= [
		{ label: 'name', model: 'badge_name', tag: 'input', type: 'text', required: true },
		{ label: 'text', model: 'badge_text', tag: 'input', type: 'text', required: true },
		{ label: 'score minimum', model: 'score_min', tag: 'input', type: 'number', required: true },
		{ label: 'score maximum', model: 'score_max', tag: 'input', type: 'number', required: true },
	];

}]);
