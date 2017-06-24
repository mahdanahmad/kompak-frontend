'use strict';

app.controller('ModalUserController', ['$scope', 'fetcher', function ($scope, fetcher) {
	'use strict';

	$scope.data = {};
	$scope.autoData = { province: [], regency: [], district: [], village: [] };
	$scope.autoSearch = { province: '', regency: '', district: '', village: '' };
	$scope.autoModel = { province: null, regency: null, district: null, village: null };

	var mapName = function mapName(data) {
		return _.chain(data).map(function (o) {
			return _.chain(o).pickBy(function (d, key) {
				return _.includes(['id', 'education'], key) || _.startsWith(key, 'name');
			}).mapKeys(function (d, key) {
				return key == 'id' ? 'id' : 'name';
			}).value();
		}).value();
	};

	var createFilterFor = function createFilterFor(query) {
		return function (data) {
			return _.includes(angular.lowercase(data.name), angular.lowercase(query));
		};
	};

	$scope.querySearch = function (value) {
		return $scope.autoSearch[value] ? $scope.autoData[value].filter(createFilterFor($scope.autoSearch[value])) : $scope.autoData[value];
	};
	$scope.isDisAuto = function (value) {
		switch (value) {
			case 'regency':
				return _.isEmpty($scope.data.usr_province);
			case 'district':
				return _.isEmpty($scope.data.usr_province) || _.isEmpty($scope.data.usr_regency);
			case 'village':
				return _.isEmpty($scope.data.usr_province) || _.isEmpty($scope.data.usr_regency) || _.isEmpty($scope.data.usr_district);
			default:
				return false;
		}
	};
	$scope.autoChanged = function (id, value, model) {
		if (id) {
			var locationId = '';
			var locationList = ['province', 'regency', 'district', 'village'];

			var nextIndex = _.indexOf(locationList, value) + 1;
			$scope.data[model] = id;

			switch (value) {
				case 'province':
					locationId = id;break;
				case 'regency':
					locationId = $scope.data.usr_province + '/' + id;break;
				case 'district':
					locationId = $scope.data.usr_province + '/' + $scope.data.usr_regency + '/' + id;break;
				default:
					return;
			}

			_.chain(locationList).drop(nextIndex).forEach(function (o) {
				$scope.autoModel[o] = null;delete $scope.data['usr_' + o];
			}).value();
			fetcher.getLocation(locationId, {}, function (response) {
				if (response.response == 'OK' && response.status_code == 200) {
					$scope.autoData[locationList[nextIndex]] = mapName(response.result);
				}
			});
		}
	};

	var init = function init() {
		async.parallel({
			instits: function instits(callback) {
				fetcher.getAllInstitution({}, function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						callback(null, mapName(response.result));
					} else {
						callback(response.message);
					}
				});
			},
			educats: function educats(callback) {
				fetcher.getAllEducation({}, function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						callback(null, mapName(response.result));
					} else {
						callback(response.message);
					}
				});
			},
			province: function province(callback) {
				fetcher.getLocation('', {}, function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						callback(null, mapName(response.result));
					} else {
						callback(response.message);
					}
				});
			}
		}, function (err, results) {
			if (err) {
				console.log(err);
			}

			$scope.autoData.province = results.province;

			$scope.inputs = [{ label: 'name', model: 'usr_display_name', tag: 'input', type: 'text', required: true }, { label: 'email', model: 'usr_email', tag: 'input', type: 'email', required: true }, { label: 'password', model: 'usr_password', tag: 'input', type: 'password', required: true }, { label: 'year of born', model: 'usr_year_born', tag: 'input', type: 'number' }, { label: 'designation', model: 'usr_designation', tag: 'input', type: 'text' }, { label: 'gender', model: 'usr_gender', tag: 'radio', value: [{ label: 'male', value: 'm' }, { label: 'female', value: 'f' }] }, { label: 'institution', model: 'usr_institution', tag: 'select', value: results.instits }, { label: 'education', model: 'usr_education', tag: 'select', value: results.educats }, { label: 'province', model: 'usr_province', tag: 'autocomplete', value: 'province' }, { label: 'regency', model: 'usr_regency', tag: 'autocomplete', value: 'regency' }, { label: 'district', model: 'usr_district', tag: 'autocomplete', value: 'district' }, { label: 'village', model: 'usr_village', tag: 'autocomplete', value: 'village' }];
		});
	};

	init();
}]);
//# sourceMappingURL=user.js.map
