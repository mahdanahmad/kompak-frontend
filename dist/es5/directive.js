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
//# sourceMappingURL=directive.js.map
