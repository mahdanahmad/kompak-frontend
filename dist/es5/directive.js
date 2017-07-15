'use strict';

app.directive('autofocus', ['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		link: function link(scope, elem, attrs) {
			if (attrs.autofocus == 'true') {
				$timeout(function () {
					elem.focus();
				});
			}
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

			var isCalender = _.includes(attrs.class, 'fa-calendar');

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
				if (isCalender && _.intersection(['date-between', 'date-filter', 'md-calendar-date', 'md-datepicker-input-container', 'md-calendar-date-selection-indicator', 'md-datepicker-input', 'md-datepicker-expand-triangle', 'md-datepicker-triangle-button', 'md-scroll-mask', 'md-datepicker-calendar-pane'], angular.element(e.target).attr('class').split(' ')).length > 0) {
					return;
				}

				scope.$apply(function () {
					scope.openDropdown = false;
				});
			});
		}
	};
}]);

app.directive('forceHeight', [function () {
	return {
		restrict: 'A',
		link: function link(scope, elem, attrs) {
			var wantedRatio = attrs.forceHeight || 1;

			scope.$watch(function () {
				return elem.width();
			}, function (newVal, oldVal) {
				elem.css('height', newVal * wantedRatio + 'px');
			});

			elem.bind('resize', function () {
				scope.$apply();
			});
		}
	};
}]);

app.directive('setVillageWidth', [function () {
	return {
		restrict: 'A',
		link: function link(scope, elem, attrs) {
			var wantedRatio = attrs.setVillageWidth || 0;

			var minWidth = 50; // in percent
			var finalWidth = minWidth + (100 - minWidth) * (wantedRatio / scope.$parent.maxVillage);

			elem.css('width', 'calc(' + finalWidth + '% - ' + +_.replace(elem.css('padding'), 'px', '') * 2 + 'px)');
		}
	};
}]);
//# sourceMappingURL=directive.js.map
