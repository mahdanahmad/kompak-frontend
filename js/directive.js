app.directive('autofocus', ['$timeout', ($timeout) => ({
	restrict: 'A',
	link: (scope, elem, attrs) => {
		if (attrs.autofocus == 'true') {
			$timeout(() => { elem.focus(); });
		}
    }
})]);

app.directive('typeEverywhere', ['$document', ($document) => ({
	require: 'ngModel',
	restrict: 'A',
	scope: { ngModel: '=' },
	link: (scope, elem, attrs) => {
		$document.bind('keypress', (e) => {
			let keyCode	= e.which || e.keyCode;
			let tagName	= angular.element($document[0].activeElement)[0].tagName;

			if (!_.includes([13], keyCode) && !_.includes(['INPUT', 'TEXTAREA'], tagName)) {
				// console.log('Got keypress:', String.fromCharCode(keyCode), keyCode);
				// if (_.isNil(scope.ngModel)) { scope.ngModel = ''; }
				scope.ngModel += String.fromCharCode(keyCode);
				elem.focus();
			}
		});
	}
})]);

app.directive('openDropdown', ['$document', ($document) => ({
	restrict: 'A',
	scope: { openDropdown: '=' },
	link: (scope, elem, attrs) => {
		scope.openDropdown	= false;

		let isCalender	= _.includes(attrs.class, 'fa-calendar');

		let childNode	= [elem[0]];
		let child		= elem.children().length;
		let current		= elem.children();
		while (child) {
			childNode	= _.concat(childNode, _.chain(current).pick(_.times(current.length)).values().value());
			current		= current.children();
			child		= current.length;
		}
		function theFunction(e) { scope.$apply(() => { scope.openDropdown = !scope.openDropdown; }); }

		// elem.bind('mouseover', theFunction);
		elem.bind('click', theFunction);

		$document.bind('click', (e) => {
			if (_.includes(childNode, e.target)) return;
			if (isCalender && _.intersection([
				'date-between',
				'date-filter',
				'md-calendar-date',
				'md-datepicker-input-container',
				'md-calendar-date-selection-indicator',
				'md-datepicker-input',
				'md-datepicker-expand-triangle',
				'md-datepicker-triangle-button',
				'md-scroll-mask',
				'md-datepicker-calendar-pane'
			], angular.element(e.target).attr('class').split(' ')).length > 0) { return; }

			scope.$apply(() => { scope.openDropdown = false; });
		});
	}
})]);

app.directive('forceHeight', [() => ({
	restrict: 'A',
	link: (scope, elem, attrs) => {
		let widthTreshold = 800;
		let params		= attrs.forceHeight ? JSON.parse(attrs.forceHeight) : [];
		let wantedRatio	= ($(window).width() > widthTreshold ? params[0] : params[1]) || 1;

		scope.$watch(() => (elem.width()), (newVal, oldVal) => {
			elem.css('height', (wantedRatio == 'full' ? ($(window).height() - 40) : (newVal * wantedRatio)) + 'px');
		});

		elem.bind('resize', () => { scope.$apply(); });
	}
})]);

app.directive('setVillageWidth', [() => ({
	restrict: 'A',
	link: (scope, elem, attrs) => {
		let wantedRatio	= attrs.setVillageWidth || 0;

		let minWidth	= 50; // in percent
		let finalWidth	= minWidth + (100 - minWidth) * (wantedRatio / scope.$parent.maxVillage);

		elem.css('width', 'calc(' + (finalWidth) + '% - ' + (+_.replace(elem.css('padding'), 'px', '') * 2) + 'px)');
	}
})]);
