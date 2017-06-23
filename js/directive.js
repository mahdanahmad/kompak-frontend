app.directive('autofocus', ['$timeout', ($timeout) => ({
    link: (scope, elem, attrs) => {
        $timeout(() => { elem.focus(); });
    }
})]);

app.directive('typeEverywhere', ['$document', ($document) => ({
	require: 'ngModel',
	restrict: 'A',
	scope: { ngModel: '=' },
	link: (scope, elem, attrs) => {
		$document.bind('keypress', (e) => {
			let keyCode	= e.which || e.keyCode;
			if (!_.includes(keyCode, [13])) {
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

		function theFunction() { scope.$apply(() => { scope.openDropdown = !scope.openDropdown; }); }

		// elem.bind('mouseover', theFunction);
		elem.bind('click', theFunction);

		$document.bind('click', (e) => {
			if (_.includes(elem, e.target)) return;
			scope.$apply(() => { scope.openDropdown = false; });
		});
	}
})]);
