'use strict';

app.controller('ModalCategoryController', ['$scope', function ($scope) {
	'use strict';

	$scope.data = $scope.ngDialogData.content || {};

	$scope.inputs = [{ label: 'name', model: 'category_name', tag: 'input', type: 'text', required: true }, { label: 'description', model: 'category_description', tag: 'textarea' }, { label: 'enable category', model: 'category_enabled', tag: 'checkbox' }];
}]);
//# sourceMappingURL=category.js.map
