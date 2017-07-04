'use strict';

app.controller('ModalLoneController', ['$scope', function ($scope) {
	'use strict';

	$scope.data = $scope.ngDialogData.content.data || {};

	$scope.inputs = [{ label: 'nama', model: 'name', tag: 'input', type: 'text', required: true }];
}]);
//# sourceMappingURL=lone.js.map
