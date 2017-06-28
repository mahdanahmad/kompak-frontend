'use strict';

app.controller('StatisticController', ['$scope', 'fetcher', '$interval', '$timeout', '$window', 'dialog', 'globalVar', function ($scope, fetcher, $interval, $timeout, $window, dialog, globalVar) {
	'use strict';

	var refreshRate = 5; // in minutes

	var pieColor = ['#535657', '#4F646F', '#519872', '#97B1A6', '#79AEA3', '#8E936D', '#779FA1', '#88AB75', '#2D93AD', '08605F', '#177E89'];

	$scope.data = {};
	$scope.pieoptions = {
		chart: {
			type: 'pieChart',
			// width: 400,
			// height: 500,
			x: function x(o) {
				return o.name;
			},
			y: function y(o) {
				return o.jumlah;
			},
			showLabels: false,
			duration: 500,
			labelThreshold: 0.01,
			labelSunbeamLayout: true,
			labelsOutside: false,
			valueFormat: function valueFormat(o) {
				return d3.format(",")(o);
			},
			cornerRadius: 4,
			showLegend: false,
			color: function color(o, i) {
				return pieColor[i] || '#000';
			},
			legend: {}
		}
	};

	$scope.baroptions = {
		chart: {
			type: 'discreteBarChart',
			margin: {
				top: 20,
				right: 20,
				bottom: 50,
				left: 55
			},
			x: function x(o) {
				return o.label;
			},
			y: function y(o) {
				return o.jumlah;
			},
			showValues: true,
			valueFormat: function valueFormat(o) {
				return d3.format(",")(o);
			},
			duration: 500,
			color: function color(o, i) {
				return '#6dc0f9';
			}
		}
	};

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
