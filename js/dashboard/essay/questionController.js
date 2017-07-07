app.controller('EssayController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, dialog, globalVar) {
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

	$scope.openHint	= () => { dialog.notif(globalVar.essayHint); }

	$scope.loadMoar	= () => {
		$scope.pauseAjx	= true;
		iterate++;
		let data = _.omitBy({
			limit,
			offset: iterate * limit,
			like: getSearch(),
			category: $scope.category.id
		}, _.isNil);
		fetcher.getAllEssay(data, (response) => {
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

	$scope.newQuestion	= () => {
		dialog.essayDialog({ categories: $scope.categories }, (dialResp) => {
			if (_.isObject(dialResp)) {
				fetcher.postEssay(_.mapValues(dialResp, _.toString), (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						initData(getSearch());
					}
				});
			}
		});
	};
	$scope.edit	= (id) => {
		async.waterfall([
			(callback) => {
				fetcher.getEssay(id, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						callback(null, response.result);
					} else {
						callback(response.message);
					}
				});
			},
			(questionData, callback) => {
				let before	= _.clone(questionData);
				dialog.essayDialog({ data: questionData, categories: $scope.categories }, (response) => {
					if (_.isObject(response) && !_.isEqual(before, response)) {
						callback(null, response);
					} else {
						callback(null);
					}
				});
			}
		], (err, result) => {
			if (err) { console.log(err); }

			if (result) {
				fetcher.putEssay(result.id, _.chain(result).mapValues(_.toString).omit([]).value(), (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						initData(getSearch());
					}
				});
			}
		});
	};

	$scope.delete	= (id, question, e) => {
		e.stopPropagation();
		dialog.confirm('Apakah anda yakin akan menghapus pertanyaan \"' + question + '\"?', (response) => {
			if (response) {
				fetcher.deleteEssay(id, (response) => {
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
		fetcher.getAllEssay(_.omitBy({ limit, like, offset: 0, category: $scope.category.id }, _.isNil), (response) => {
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
				$scope.categories	= _.chain(response.result).map((o) => ({ id: o.ID_category, name: o.category_name })).sortBy(['name']).unshift({ id: null, name: 'Semua' }).value();
				$scope.category		= _.head($scope.categories);

				initData();
			}
		});
	}

	init();
}]);
