'use strict';

app.controller('ModalLocationController', ['$scope', function ($scope) {
	'use strict';

	$scope.data = $scope.ngDialogData.content.data || {};
	$scope.inputs = [{ label: 'id', model: 'id', tag: 'input', required: true }, { label: 'nama', model: 'name', tag: 'input', required: true }];
}]);
//# sourceMappingURL=location.js.map
