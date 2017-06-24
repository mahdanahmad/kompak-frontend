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
				var tagName = angular.element($document[0].activeElement)[0].tagName;

				if (!_.includes([13], keyCode) && !_.includes(['INPUT', 'TEXTAREA'], tagName)) {
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

			var childNode = [elem[0]];
			var child = elem.children().length;
			var current = elem.children();
			while (child) {
				childNode = _.concat(childNode, _.chain(current).pick(_.times(current.length)).values().value());
				current = current.children();
				child = current.length;
			}
			function theFunction(e) {
				scope.$apply(function () {
					scope.openDropdown = !scope.openDropdown;
				});
			}

			// elem.bind('mouseover', theFunction);
			elem.bind('click', theFunction);

			$document.bind('click', function (e) {
				if (_.includes(childNode, e.target)) return;
				scope.$apply(function () {
					scope.openDropdown = false;
				});
			});
		}
	};
}]);
//# sourceMappingURL=directive.js.map
