'use strict';

var angular = angular;
var app = angular.module('app', ['ui.router', 'ct.ui.router.extras.core', 'permission', 'permission.ui', 'LocalStorageModule', 'ngDialog', 'angular-loading-bar', 'ngAnimate', 'infinite-scroll', 'ngMaterial', 'wu.masonry', 'ngSanitize', 'nvd3']);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$mdThemingProvider', '$mdDateLocaleProvider', 'localStorageServiceProvider', 'cfpLoadingBarProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $mdDateLocaleProvider, localStorageServiceProvider, cfpLoadingBarProvider) {
				'use strict';

				// use the HTML5 History API
				// $locationProvider.html5Mode(true);

				// $httpProvider.defaults.withCredentials = true;

				$urlRouterProvider.otherwise(function ($injector) {
								var $state = $injector.get("$state");
								$state.go('auth');
				});

				$stateProvider.state('auth', {
								url: '/auth',
								templateUrl: 'views/auth/auth.html',
								controller: 'AuthController',
								data: { permissions: { except: ['isAuthorized'], redirectTo: 'dashboard.statistic' } }
				}).state('dashboard', {
								url: '',
								templateUrl: 'views/dashboard/dashboard.html',
								controller: 'DashboardController',
								abstract: true,
								data: { permissions: { only: ['isAuthorized'], redirectTo: 'auth' } }
				}).state('dashboard.statistic', {
								url: '/statistic',
								templateUrl: 'views/dashboard/statistic.html',
								controller: 'StatisticController'
				}).state('dashboard.user', {
								url: '/user',
								templateUrl: 'views/dashboard/user.html',
								controller: 'UserController'
				}).state('dashboard.admin', {
								url: '/admin',
								templateUrl: 'views/dashboard/admin.html',
								controller: 'AdminController'
				}).state('dashboard.choices', {
								url: '/choices',
								templateUrl: 'views/dashboard/choices/question.html',
								controller: 'ChoicesController'
				}).state('dashboard.choicesAns', {
								url: '/choicesAns',
								templateUrl: 'views/dashboard/choices/answer.html',
								controller: 'ChoicesAnsController'
				}).state('dashboard.essay', {
								url: '/essay',
								templateUrl: 'views/dashboard/essay/question.html',
								controller: 'EssayController'
				}).state('dashboard.essayAns', {
								url: '/essayAns',
								templateUrl: 'views/dashboard/essay/answer.html',
								controller: 'EssayAnsController'
				}).state('dashboard.location', {
								url: '/location/:province/:regency/:district',
								templateUrl: 'views/dashboard/location.html',
								controller: 'LocationController',
								params: {
												province: { squash: true, value: null },
												regency: { squash: true, value: null },
												district: { squash: true, value: null }
								}
				}).state('dashboard.misc', {
								url: '/misc',
								templateUrl: 'views/dashboard/misc.html',
								controller: 'MiscController'
				}).state('dashboard.logs', {
								url: '/logs',
								templateUrl: 'views/dashboard/logs.html',
								controller: 'LogsController'
				});

				localStorageServiceProvider.setPrefix('gapuradesa');

				cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
				$mdThemingProvider.disableTheming();
				$mdDateLocaleProvider.formatDate = function (date) {
								return moment(date).format('DD MMMM YYYY');
				};
}]);

app.controller('MainController', ['$scope', '$rootScope', '$location', 'localStorageService', 'fetcher', function ($scope, $rootScope, $location, localStorageService, fetcher) {
				'use strict';
}]);

app.run(['PermPermissionStore', 'localStorageService', '$templateCache', function (PermPermissionStore, localStorageService, $templateCache) {
				PermPermissionStore.definePermission('isAuthorized', function () {
								return !_.isNull(localStorageService.get('id'));
				});
}]);
//# sourceMappingURL=app.js.map
