app.controller('ChoicesAnsController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, dialog, globalVar) {
    'use strict';

	let limit		= 15;
	let iterate		= 0;
	let typeDelay	= 500;

	// $scope.categories	= [];
	$scope.category		= {};

	$scope.data		= [];
	$scope.pauseAjx	= false;
	$scope.doneAjx	= false;

	$scope.search	= "";
	$scope.nodata	= null;
	$scope.loading	= globalVar.loading;

	let getSearch	= () => ($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);

	$scope.toDate	= (stringDate) => (moment(stringDate).format("dddd, MMMM Do YYYY, h:mm a"));

	$scope.loadMoar	= () => {
		$scope.pauseAjx	= true;
		iterate++;
		let data = _.omitBy({
			limit,
			offset: iterate * limit,
			like: getSearch(),
			category: $scope.category.id
		}, _.isNil);
		fetcher.getAllAnswer(data, (response) => {
			if (response.response == 'OK' && response.status_code == 200 && response.result) {
				if (response.result.length < limit) { $scope.doneAjx = true; }
				$scope.data 	= _.concat($scope.data, response.result);
			} else {
				$scope.doneAjx	= true;
			}
			$scope.pauseAjx	= false;
		});
	};

	let delayTimeout;
	$scope.$watch('search', (newVal, oldVal) => {
		if (!_.isNil(newVal) && newVal !== oldVal) {
			if (delayTimeout) $timeout.cancel(delayTimeout);

			delayTimeout	= $timeout(() => {
				if (newVal.length >= 3) {
					initData(newVal);
				} else if (newVal == '' && !$scope.pauseAjx) {
					initData();
				}
			}, typeDelay);
		} else {
			$scope.search = '';
		}
	});

	$scope.selectCate	= (selected) => { $scope.category = selected; initData(getSearch()); }

	$scope.delete	= (id, name, e) => {
		e.stopPropagation();
		dialog.confirm('Are you sure you wanna delete an answer by ' + name + '?', (response) => {
			if (response) {
				fetcher.deleteAnswer(id, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						initData(getSearch());
					}
				});
			}
		});
	}

	let initData	= (like) => {
		$scope.pauseAjx	= true;
		$scope.nodata	= null;
		iterate	= 0;
		fetcher.getAllAnswer(_.omitBy({ limit, like, offset: 0, category: $scope.category.id }, _.isNil), (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.data	= response.result;
				if (!response.result) {
					$scope.nodata = globalVar.nodata; $scope.doneAjx = true;
				} else  if (response.result.length < limit) {
					$scope.doneAjx = true;
				} else {
					$scope.doneAjx	= false;
				}
				$scope.pauseAjx	= false;
			}
		});
	}

	let init = () => {
		fetcher.getAllCategory({}, (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.categories	= _.chain(response.result).map((o) => ({ id: o.ID_category, name: o.category_name })).concat([{ id: null, name: 'All' }]).sortBy(['name']).value();
				$scope.category		= _.head($scope.categories);

				initData();
			}
		});
	}

	init();
}]);
