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
			scope.$apply(() => { scope.openDropdown = false; });
		});
	}
})]);
