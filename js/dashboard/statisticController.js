app.controller('StatisticController', ['$scope', 'fetcher', '$interval', '$timeout', '$window', 'dialog', 'globalVar', function ($scope, fetcher, $interval, $timeout, $window, dialog, globalVar) {
    'use strict';

	let refreshRate	= 5; // in minutes

	let pieColor	= ['#535657', '#4F646F', '#519872', '#97B1A6', '#79AEA3', '#8E936D', '#779FA1', '#88AB75', '#2D93AD', '08605F', '#177E89'];

	$scope.downloadLink	= (name) => (fetcher.getFilesLink(name, { startdate: moment($scope.startDate).format(globalVar.dateFormat), enddate: moment($scope.endDate).format(globalVar.dateFormat) }));

	$scope.startDate	= moment().year(2017).startOf('year').toDate();
	$scope.endDate		= moment().toDate();
	$scope.dateChange	= () => { init(); }

	$scope.data	= {};
	$scope.pieoptions = {
		chart: {
			type: 'pieChart',
			// width: 400,
			// height: 500,
			x: (o) => (o.name),
			y: (o) => (o.jumlah),
			showLabels: false,
			duration: 500,
			labelThreshold: 0.01,
			labelSunbeamLayout: true,
			labelsOutside: false,
			valueFormat: (o) => (d3.format(",")(o)),
			cornerRadius: 4,
			showLegend: true,
			// legendPosition: 'bottom',
			color: (o, i) => (pieColor[i] || '#000'),
			legend: {}
		}
	};

	$scope.baroptions = {
		chart: {
			type: 'discreteBarChart',
			margin : {
				top: 20,
				right: 20,
				bottom: 50,
				left: 55
			},
			x: (o) => (o.label),
			y: (o) => (o.jumlah),
			showValues: true,
			valueFormat: (o) => (d3.format(",")(o)),
			duration: 500,
			color: (o, i) => ('#6dc0f9'),
		}
	};

	$scope.overview	= [
		[
			{ label: 'total pemain', model: 'total'},
			{ label: 'pemain masuk', model: 'login'},
			{ label: 'pertanyaan', model: 'pertanyaan'},
			{ label: 'jawaban', model: 'jawaban'},
		],
		[
			{ label: 'provinsi', model: 'province'},
			{ label: 'kabupaten', model: 'regency'},
			{ label: 'kecamatan', model: 'district'},
			{ label: 'desa', model: 'village'},
		],
	];

	let init = () => {
		fetcher.getStatistic({ startdate: moment($scope.startDate).format(globalVar.dateFormat), enddate: moment($scope.endDate).format(globalVar.dateFormat) }, (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.data	= response.result;
				$scope.currentTime = moment().format("dddd, Do MMMM YYYY, hh:mm");
				$scope.maxVillage = _.chain(response).get(['result', 'topvillage']).maxBy('jumlah').get('jumlah').value() || 1;
			}
		});
	}

	init();
	let timer = $interval(() => { init(); }, refreshRate * 60 * 1000);
	$scope.$on("$destroy", () => { $interval.cancel(timer); });

}]);
