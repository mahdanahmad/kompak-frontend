'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

app.factory('dialog', ['ngDialog', function (ngDialog) {
	'use strict';

	var _ref;

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

	return _ref = {
		userDialog: function userDialog(content, callback) {
			var dialog = createDialog(content, 'user', 'ModalUserController', 1000);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		essayDialog: function essayDialog(content, callback) {
			var dialog = createDialog(content, 'choices', 'ModalChoicesController', 1000);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		}
	}, _defineProperty(_ref, 'essayDialog', function essayDialog(content, callback) {
		var dialog = createDialog(content, 'essay', 'ModalEssayController', 1000);
		dialog.closePromise.then(function (data) {
			callback(data.value);
		});
	}), _defineProperty(_ref, 'confirm', function confirm(content, callback) {
		var dialog = createDialog(content, 'confirm', ['$scope', function ($scope) {}]);
		dialog.closePromise.then(function (data) {
			callback(data.value == 'yes');
		});
	}), _defineProperty(_ref, 'notif', function notif(content) {
		var dialog = createDialog(content, 'notif', ['$scope', function ($scope) {}]);
		// dialog.closePromise.then((data) => { callback(); });
	}), _defineProperty(_ref, 'error', function error(content) {
		var dialog = createDialog(content, 'error', ['$scope', function ($scope) {}]);
		// dialog.closePromise.then((data) => { callback(); });
	}), _ref;
}]);

app.factory('globalVar', [function () {
	'use strict';

	return {
		nodata: 'no data available at this point.',
		loading: 'loading data'
	};
}]);
//# sourceMappingURL=helpers.js.map
