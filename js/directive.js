app.directive('autofocus', ['$timeout', ($timeout) => ({
    link: (scope, elem, attrs) => {
        $timeout(() => { elem.focus(); });
    }
})]);
