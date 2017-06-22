'use strict';

var angular = angular;
var app = angular.module('app', ['ui.router', 'ct.ui.router.extras.core', 'permission', 'permission.ui', 'LocalStorageModule', 'ngDialog', 'angular-loading-bar', 'ngAnimate']);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', 'localStorageServiceProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, localStorageServiceProvider) {
    'use strict';

    // use the HTML5 History API
    // $locationProvider.html5Mode(true);

    // $urlRouterProvider.otherwise( function($injector) {
    //     let $state = $injector.get("$state");
    //     $state.go('auth');
    // });

    // $stateProvider
    // .state('auth', {
    //     url         : '/auth',
    //     templateUrl : 'views/auth/auth.html',
    //     controller  : 'AuthController',
    //     // abstract    : true,
    //     data        : { permissions: { except: ['isAuthorized'], redirectTo: 'karyawan.profil' } }
    // });

    localStorageServiceProvider.setPrefix('gapuradesa');
}]);

app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {}]);

app.controller('MainController', ['$scope', '$rootScope', '$location', 'localStorageService', 'fetcher', function ($scope, $rootScope, $location, localStorageService, fetcher) {
    'use strict';
}]);

app.run(['PermPermissionStore', 'localStorageService', '$templateCache', function (PermPermissionStore, localStorageService, $templateCache) {
    // PermPermissionStore.definePermission('isAuthorized', () => (!_.isNull(localStorageService.get('_id'))));

}]);
//# sourceMappingURL=app.js.map
