app.factory('dialog', ['ngDialog', function(ngDialog) {
	'use strict';

	let createDialog = (content, template, controller, width, showClose, additionalClass) => (
		ngDialog.open({
			template: 'views/dialogs/' + template + '.html',
			className: 'ngdialog-theme-default' + (additionalClass ? (' ' + additionalClass) : ''),
			data: { content: content },
			width: width ? width : 450,
			showClose: showClose ? showClose : false,
			controller
		})
	);

	return {
		userDialog	: (content, callback) => {
			let dialog	= createDialog(content, 'user', 'ModalUserController', 1000);
			dialog.closePromise.then((data) => { callback(data.value); });
		},
		essayDialog	: (content, callback) => {
			let dialog	= createDialog(content, 'choices', 'ModalChoicesController', 1000);
			dialog.closePromise.then((data) => { callback(data.value); });
		},
		essayDialog	: (content, callback) => {
			let dialog	= createDialog(content, 'essay', 'ModalEssayController', 1000);
			dialog.closePromise.then((data) => { callback(data.value); });
		},
		confirm		: (content, callback) => {
			let dialog	= createDialog(content, 'confirm', ['$scope', ($scope) => { }]);
			dialog.closePromise.then((data) => { callback(data.value == 'yes'); });
		},
		notif		: (content) => {
			let dialog	= createDialog(content, 'notif', ['$scope', ($scope) => { }]);
			// dialog.closePromise.then((data) => { callback(); });
		},
		error		: (content) => {
			let dialog	= createDialog(content, 'error', ['$scope', ($scope) => { }]);
			// dialog.closePromise.then((data) => { callback(); });
		},
	}

}]);

app.factory('globalVar', [function() {
	'use strict';

	return {
		nodata: 'no data available at this point.',
		loading: 'loading data',
	}
}]);
