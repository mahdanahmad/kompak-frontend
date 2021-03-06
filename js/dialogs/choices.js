app.controller('ModalChoicesController', ['$scope', function ($scope) {
    'use strict';

	$scope.data			= $scope.ngDialogData.content.data || {};
	$scope.data.question_enabled	= ($scope.data.question_enabled == 1 || false);

	$scope.inputs	= [
		{ label: 'pertanyaan', model: 'question_text', tag: 'textarea', required: true },
		{ label: 'jawaban 1', model: 'response_1', tag: 'textarea', required: true },
		{ label: 'jawaban 2', model: 'response_2', tag: 'textarea', required: true },
		{ label: 'jawaban 3', model: 'response_3', tag: 'textarea', required: true },
		{ label: 'jawaban 4', model: 'response_4', tag: 'textarea', required: true },
		{ label: 'jawaban benar', model: 'correct_response', tag: 'select', value: _.chain(4).times((o) => (o + 1)).map((o) => ({ id: o, name: o })).value(), required: true },
		{ label: 'kategori', model: 'question_category', tag: 'select', value: _.omitBy($scope.ngDialogData.content.categories, (o) => (_.isNil(o.id))), required: true },
		{ label: 'nilai jawaban benar', model: 'bonus_value', tag: 'input', type: 'number' },
		{ label: 'waktu menjawab (detik)', model: 'time_to_answer', tag: 'input', type: 'number' },
		{ label: 'aktifkan pertanyaan', model: 'question_enabled', tag: 'checkbox' },
	];

}]);
