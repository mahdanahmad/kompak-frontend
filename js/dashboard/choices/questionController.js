app.controller('ChoicesController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, dialog, globalVar) {
    'use strict';

	let limit		= 10;
	let iterate		= 0;
	let typeDelay	= 500;

	// $scope.categories	= [];
	// $scope.category		= {};

	$scope.data		= [];
	$scope.pauseAjx	= false;
	$scope.doneAjx	= false;

	$scope.search	= "";
	$scope.nodata	= null;
	$scope.loading	= globalVar.loading;

	let getSearch	= () => ($scope.search ? (($scope.search.length >= 3) ? $scope.search : null) : null);

	$scope.loadMoar	= () => {
		$scope.pauseAjx	= true;
		iterate++;
		let data = _.omitBy({
			limit,
			offset: iterate * limit,
			like: getSearch(),
			category: $scope.category.id
		}, _.isNil);
		fetcher.getAllQuestion(data, (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
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
		if (!_.isNil(newVal)) {
			if (delayTimeout) $timeout.cancel(delayTimeout);

			delayTimeout	= $timeout(() => {
				if (newVal !== oldVal && newVal.length >= 3) {
					initData(newVal);
				} else if (newVal == '') {
					initData();
				}
			}, typeDelay);
		} else {
			$scope.search = '';
		}
	});

	$scope.selectCate	= (selected) => { $scope.category = selected; initData(getSearch()); }

	$scope.newQuestion	= () => {
		dialog.choicesDialog({ categories: $scope.categories }, (dialResp) => {
			if (_.isObject(dialResp)) {
				dialResp.question_enabled	= dialResp.question_enabled ? '1' : '0';
				fetcher.postQuestion(_.mapValues(dialResp, _.toString), (response) => {
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
				fetcher.getQuestion(id, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						callback(null, response.result);
					} else {
						callback(response.message);
					}
				});
			},
			(questionData, callback) => {
				let before	= _.clone(questionData);
				dialog.choicesDialog({ data: questionData, categories: $scope.categories }, (response) => {
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
				result.question_enabled	= result.question_enabled ? '1' : '0';
				fetcher.putQuestion(result.ID_question, _.chain(result).mapValues(_.toString).omit(['no_of_times_correctly_answered', 'no_of_times_incorrectly_answered', 'no_of_times_presented_as_challenge', 'no_of_times_response_1', 'no_of_times_response_2', 'no_of_times_response_3', 'no_of_times_response_4']).value(), (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						initData(getSearch());
					}
				});
			}
		});
	};

	$scope.changeEna	= (o, e) => {
		e.stopPropagation();
		let question_enabled	= o.question_enabled ? '0' : '1';

		fetcher.putQuestion(o.ID_question, { question_enabled }, (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				o.question_enabled	= !o.question_enabled;
			}
		});
	};
	$scope.delete	= (id, question, e) => {
		e.stopPropagation();
		dialog.confirm('Are you sure you wanna delete question \"' + question + '\"?', (response) => {
			if (response) {
				fetcher.deleteQuestion(id, (response) => {
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
		fetcher.getAllQuestion(_.omitBy({ limit, like, offset: 0, category: $scope.category.id }, _.isNil), (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				$scope.data	= response.result;
				if (!response.result) {
					$scope.nodata = globalVar.nodata;
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
