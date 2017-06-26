app.controller('ModalChoicesController', ['$scope', function ($scope) {
    'use strict';

	$scope.data			= $scope.ngDialogData.content.data || {};

	$scope.inputs	= [
		{ label: 'question', model: 'question_text', tag: 'textarea', required: true },
		{ label: 'answer 1', model: 'response_1', tag: 'textarea', required: true },
		{ label: 'answer 2', model: 'response_2', tag: 'textarea', required: true },
		{ label: 'answer 3', model: 'response_3', tag: 'textarea', required: true },
		{ label: 'answer 4', model: 'response_4', tag: 'textarea', required: true },
		{ label: 'correct answer', model: 'correct_response', tag: 'select', value: _.chain(4).times((o) => (o + 1)).map((o) => ({ id: o, name: o })).value(), required: true },
		{ label: 'category', model: 'question_category', tag: 'select', value: _.omitBy($scope.ngDialogData.content.categories, (o) => (_.isNil(o.id))), required: true },
		{ label: 'point value', model: 'bonus_value', tag: 'input', type: 'number' },
		{ label: 'time to answer (minutes)', model: 'time_to_answer', tag: 'input', type: 'number' },
		{ label: 'enable question', model: 'question_enabled', tag: 'checkbox' },
	];

}]);
