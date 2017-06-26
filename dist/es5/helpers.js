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
		choicesDialog: function choicesDialog(content, callback) {
			var dialog = createDialog(content, 'choices', 'ModalChoicesController', 1000);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		essayDialog: function essayDialog(content, callback) {
			var dialog = createDialog(content, 'essay', 'ModalEssayController', 1000);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		locationDialog: function locationDialog(content, callback) {
			var dialog = createDialog(content, 'location', 'ModalLocationController', 600);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		categoryDialog: function categoryDialog(content, callback) {
			var dialog = createDialog(content, 'category', 'ModalCategoryController', 600);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		badgeDialog: function badgeDialog(content, callback) {
			var dialog = createDialog(content, 'badge', 'ModalBadgeController', 750);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		loneDialog: function loneDialog(content, callback) {
			var dialog = createDialog(content, 'lone', 'ModalLoneController', 600);
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
		loading: 'loading data',
		globalError: 'something something happened. please smell your coffee while we fixing this.',
		settingUpdated: 'setting successfully updated.'
	};
}]);
//# sourceMappingURL=helpers.js.map
