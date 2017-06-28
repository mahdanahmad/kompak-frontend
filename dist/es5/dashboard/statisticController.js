'use strict';

app.controller('StatisticController', ['$scope', 'fetcher', '$interval', 'dialog', 'globalVar', function ($scope, fetcher, $interval, dialog, globalVar) {
	'use strict';

	var refreshRate = 5; // in minutes

	$scope.data = {};

	$scope.overview = [[{ label: 'users', model: 'total' }, { label: 'login', model: 'login' }, { label: 'transactions', model: 'transaction' }], [{ label: 'provinces', model: 'province' }, { label: 'regencies', model: 'regency' }, { label: 'districts', model: 'district' }, { label: 'villages', model: 'village' }]];

	var init = function init() {
		fetcher.getStatistic(function (response) {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.data = response.result;
				$scope.currentTime = moment().format("dddd, MMMM Do YYYY, h:mm a");
				$scope.maxVillage = _.chain(response).get(['result', 'topvillage']).maxBy('jumlah').get('jumlah').value() || 1;
			}
		});
	};

	init();
	$interval(function () {
		init();
	}, refreshRate * 60 * 1000);
}]);
//# sourceMappingURL=statisticController.js.map
