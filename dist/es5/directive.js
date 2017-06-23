'use strict';

app.directive('autofocus', ['$timeout', function ($timeout) {
	return {
		link: function link(scope, elem, attrs) {
			$timeout(function () {
				elem.focus();
			});
		}
	};
}]);

app.directive('typeEverywhere', ['$document', function ($document) {
	return {
		require: 'ngModel',
		restrict: 'A',
		scope: { ngModel: '=' },
		link: function link(scope, elem, attrs) {
			$document.bind('keypress', function (e) {
				var keyCode = e.which || e.keyCode;
				if (!_.includes(keyCode, [13])) {
					// console.log('Got keypress:', String.fromCharCode(keyCode), keyCode);
					// if (_.isNil(scope.ngModel)) { scope.ngModel = ''; }
					scope.ngModel += String.fromCharCode(keyCode);
					elem.focus();
				}
			});
		}
	};
}]);

app.directive('openDropdown', ['$document', function ($document) {
	return {
		restrict: 'A',
		scope: { openDropdown: '=' },
		link: function link(scope, elem, attrs) {
			scope.openDropdown = false;

			function theFunction() {
				scope.$apply(function () {
					scope.openDropdown = !scope.openDropdown;
				});
			}

			// elem.bind('mouseover', theFunction);
			elem.bind('click', theFunction);

			$document.bind('click', function (e) {
				if (_.includes(elem, e.target)) return;
				scope.$apply(function () {
					scope.openDropdown = false;
				});
			});
		}
	};
}]);
//# sourceMappingURL=directive.js.map
