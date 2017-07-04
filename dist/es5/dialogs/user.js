'use strict';

app.controller('ModalUserController', ['$scope', 'fetcher', function ($scope, fetcher) {
	'use strict';

	$scope.data = $scope.ngDialogData.content || {};
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

	var setAuto = function setAuto(data, id, state) {
		var selected = _.find(data, ['id', id]);

		$scope.autoData[state] = selected;
		$scope.autoSearch[state] = selected.name;
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
				$scope.autoModel[o] = null;$scope.autoSearch[o] = '';$scope.data['usr_' + o] = null;
			}).value();
			fetcher.getLocation(locationId, {}, function (response) {
				if (response.response == 'OK' && response.status_code == 200) {
					$scope.autoData[locationList[nextIndex]] = mapName(response.result.data);
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
						var mappedResult = mapName(response.result.data);
						if ($scope.data.usr_province) {
							setAuto(mappedResult, $scope.data.usr_province, 'province');
						}
						callback(null, mappedResult);
					} else {
						callback(response.message);
					}
				});
			},
			regency: function regency(callback) {
				if ($scope.data.ID && $scope.data.usr_province) {
					fetcher.getLocation($scope.data.usr_province, {}, function (response) {
						if (response.response == 'OK' && response.status_code == 200) {
							var mappedResult = mapName(response.result.data);
							if ($scope.data.usr_regency) {
								setAuto(mappedResult, $scope.data.usr_regency, 'regency');
							}
							callback(null, mappedResult);
						} else {
							callback(response.message);
						}
					});
				} else {
					callback(null, []);
				}
			},
			district: function district(callback) {
				if ($scope.data.ID && $scope.data.usr_province && $scope.data.usr_regency) {
					fetcher.getLocation($scope.data.usr_province + '/' + $scope.data.usr_regency, {}, function (response) {
						if (response.response == 'OK' && response.status_code == 200) {
							var mappedResult = mapName(response.result.data);
							if ($scope.data.usr_district) {
								setAuto(mappedResult, $scope.data.usr_district, 'district');
							}
							callback(null, mappedResult);
						} else {
							callback(response.message);
						}
					});
				} else {
					callback(null, []);
				}
			},
			village: function village(callback) {
				if ($scope.data.ID && $scope.data.usr_province && $scope.data.usr_regency && $scope.data.usr_district) {
					fetcher.getLocation($scope.data.usr_province + '/' + $scope.data.usr_regency + '/' + $scope.data.usr_district, {}, function (response) {
						if (response.response == 'OK' && response.status_code == 200) {
							var mappedResult = mapName(response.result.data);
							if ($scope.data.usr_village) {
								setAuto(mappedResult, $scope.data.usr_village, 'village');
							}
							callback(null, mappedResult);
						} else {
							callback(response.message);
						}
					});
				} else {
					callback(null, []);
				}
			}
		}, function (err, results) {
			if (err) {
				console.log(err);
			}

			$scope.autoData.province = results.province;
			$scope.autoData.regency = results.regency;
			$scope.autoData.district = results.district;
			$scope.autoData.village = results.village;

			$scope.inputs = [{ label: 'nama', model: 'usr_display_name', tag: 'input', type: 'text', required: true }, { label: 'email', model: 'usr_email', tag: 'input', type: 'email', required: true }, { label: 'password', model: 'usr_password', tag: 'input', type: 'password', required: true }, { label: 'tahun lahir', model: 'usr_year_born', tag: 'input', type: 'number' }, { label: 'jabatan', model: 'usr_designation', tag: 'input', type: 'text' }, { label: 'jenis kelamin', model: 'usr_gender', tag: 'radio', value: [{ label: 'male', value: 'm' }, { label: 'female', value: 'f' }] }, { label: 'lembaga', model: 'usr_institution', tag: 'select', value: results.instits }, { label: 'pendidikan', model: 'usr_education', tag: 'select', value: results.educats }, { label: 'provinsi', model: 'usr_province', tag: 'autocomplete', value: 'province' }, { label: 'kabupaten', model: 'usr_regency', tag: 'autocomplete', value: 'regency' }, { label: 'kecamatan', model: 'usr_district', tag: 'autocomplete', value: 'district' }, { label: 'desa', model: 'usr_village', tag: 'autocomplete', value: 'village' }];
		});
	};

	init();
}]);
//# sourceMappingURL=user.js.map
