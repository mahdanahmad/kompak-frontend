'use strict';

app.factory('dialog', ['ngDialog', function (ngDialog) {
	'use strict';

	var createDialog = function createDialog(content, template, controller, width, showClose, additionalClass) {
		return ngDialog.open({
			template: 'views/dialogs/' + template + '.html',
			className: 'ngdialog-theme-default' + (additionalClass ? ' ' + additionalClass : ''),
			data: { content: content },
			width: width ? width : 450,
			showClose: showClose ? showClose : false,
			controller: controller
		});
	};

	return {
		userDialog: function userDialog(content, callback) {
			var dialog = createDialog(content, 'user', 'ModalUserController', 1000);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		questionDialog: function questionDialog(content, callback) {
			var dialog = createDialog(content, 'question', 'ModalQuestionController', 1000);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		confirm: function confirm(content, callback) {
			var dialog = createDialog(content, 'confirm', ['$scope', function ($scope) {}]);
			dialog.closePromise.then(function (data) {
				callback(data.value == 'yes');
			});
		},
		notif: function notif(content) {
			var dialog = createDialog(content, 'notif', ['$scope', function ($scope) {}]);
			// dialog.closePromise.then((data) => { callback(); });
		},
		error: function error(content) {
			var dialog = createDialog(content, 'error', ['$scope', function ($scope) {}]);
			// dialog.closePromise.then((data) => { callback(); });
		}
	};
}]);

app.factory('globalVar', [function () {
	'use strict';

	return {
		nodata: 'no data available at this point.',
		loading: 'loading data'
	};
}]);
//# sourceMappingURL=helpers.js.map
