app.controller('StatisticController', ['$scope', 'fetcher', '$interval', 'dialog', 'globalVar', function ($scope, fetcher, $interval, dialog, globalVar) {
    'use strict';

	let refreshRate	= 5; // in minutes

	$scope.data	= {};

	$scope.overview	= [
		[
			{ label: 'users', model: 'total'},
			{ label: 'login', model: 'login'},
			{ label: 'transactions', model: 'transaction'},
		],
		[
			{ label: 'provinces', model: 'province'},
			{ label: 'regencies', model: 'regency'},
			{ label: 'districts', model: 'district'},
			{ label: 'villages', model: 'village'},
		],
	]

	let init = () => {
		fetcher.getStatistic((response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.data	= response.result;
				$scope.currentTime = moment().format("dddd, MMMM Do YYYY, h:mm a");
				$scope.maxVillage = _.chain(response).get(['result', 'topvillage']).maxBy('jumlah').get('jumlah').value() || 1;
			}
		});
	}

	init();
	$interval(() => { init(); }, refreshRate * 60 * 1000);
}]);
