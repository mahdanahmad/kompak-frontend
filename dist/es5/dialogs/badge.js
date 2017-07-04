'use strict';

app.controller('ModalBadgeController', ['$scope', function ($scope) {
	'use strict';

	$scope.data = $scope.ngDialogData.content || {};

	$scope.inputs = [{ label: 'nama', model: 'badge_name', tag: 'input', type: 'text', required: true }, { label: 'text', model: 'badge_text', tag: 'input', type: 'text', required: true }, { label: 'skor terendah', model: 'score_min', tag: 'input', type: 'number', required: true }, { label: 'skor tertinggi', model: 'score_max', tag: 'input', type: 'number', required: true }];
}]);
//# sourceMappingURL=badge.js.map
