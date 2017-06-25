app.controller('ModalUserController', ['$scope', 'fetcher', function ($scope, fetcher) {
    'use strict';

	$scope.data			= $scope.ngDialogData.content || {};
	$scope.autoData		= { province: [], regency: [], district: [], village: [] };
	$scope.autoSearch	= { province: '', regency: '', district: '', village: '' };
	$scope.autoModel	= { province: null, regency: null, district: null, village: null };

	let mapName	= (data) => (
		_.chain(data).map((o) => (
			_.chain(o).pickBy((d, key) => ( _.includes(['id', 'education'], key) || _.startsWith(key, 'name') )).mapKeys((d, key) => (key == 'id' ? 'id' : 'name')).value()
		)).value()
	);

	let setAuto	= (data, id, state) => {
		let selected	= _.find(data, ['id', id]);

		$scope.autoData[state]		= selected;
		$scope.autoSearch[state]	= selected.name;
	}

	let createFilterFor	= (query) => ((data) => (_.includes(angular.lowercase(data.name), angular.lowercase(query))))

	$scope.querySearch	= (value) => ($scope.autoSearch[value] ? $scope.autoData[value].filter( createFilterFor($scope.autoSearch[value]) ) : $scope.autoData[value])
	$scope.isDisAuto	= (value) => {
		switch (value) {
			case 'regency': return (_.isEmpty($scope.data.usr_province));
			case 'district': return (_.isEmpty($scope.data.usr_province) || _.isEmpty($scope.data.usr_regency));
			case 'village': return (_.isEmpty($scope.data.usr_province) || _.isEmpty($scope.data.usr_regency) || _.isEmpty($scope.data.usr_district));
			default: return false;
		}
	}
	$scope.autoChanged	= (id, value, model) => {
		if (id) {
			let locationId		= '';
			let locationList	= ['province', 'regency', 'district', 'village'];

			let nextIndex		= _.indexOf(locationList, value) + 1;
			$scope.data[model]	= id;

			switch (value) {
				case 'province':
				locationId = id; break;
				case 'regency':
				locationId = $scope.data.usr_province + '/' + id; break;
				case 'district':
				locationId = $scope.data.usr_province + '/' + $scope.data.usr_regency + '/' + id; break;
				default: return;
			}

			_.chain(locationList).drop(nextIndex).forEach((o) => { $scope.autoModel[o] = null; $scope.autoSearch[o] = ''; $scope.data['usr_' + o] = null; }).value();
			fetcher.getLocation(locationId, {}, (response) => {
				if (response.response == 'OK' && response.status_code == 200) {
					$scope.autoData[locationList[nextIndex]] = mapName(response.result);
				}
			});
		}
	}

	let init = () => {
		async.parallel({
			instits: (callback) => {
				fetcher.getAllInstitution({}, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						callback(null, mapName(response.result));
					} else {
						callback(response.message);
					}
				});
			},
			educats: (callback) => {
				fetcher.getAllEducation({}, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						callback(null, mapName(response.result));
					} else {
						callback(response.message);
					}
				});
			},
			province: (callback) => {
				fetcher.getLocation('', {}, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						let mappedResult	= mapName(response.result);
						if ($scope.data.usr_province) { setAuto(mappedResult, $scope.data.usr_province, 'province'); }
						callback(null, mappedResult);
					} else {
						callback(response.message);
					}
				});
			},
			regency: (callback) => {
				if ($scope.data.ID && $scope.data.usr_province) {
					fetcher.getLocation($scope.data.usr_province, {}, (response) => {
						if (response.response == 'OK' && response.status_code == 200) {
							let mappedResult	= mapName(response.result);
							if ($scope.data.usr_regency) { setAuto(mappedResult, $scope.data.usr_regency, 'regency'); }
							callback(null, mappedResult);
						} else {
							callback(response.message);
						}
					});
				} else {
					callback(null, []);
				}
			},
			district: (callback) => {
				if ($scope.data.ID && $scope.data.usr_province && $scope.data.usr_regency) {
					fetcher.getLocation($scope.data.usr_province + '/' + $scope.data.usr_regency, {}, (response) => {
						if (response.response == 'OK' && response.status_code == 200) {
							let mappedResult	= mapName(response.result);
							if ($scope.data.usr_district) { setAuto(mappedResult, $scope.data.usr_district, 'district'); }
							callback(null, mappedResult);
						} else {
							callback(response.message);
						}
					});
				} else {
					callback(null, []);
				}
			},
			village: (callback) => {
				if ($scope.data.ID && $scope.data.usr_province && $scope.data.usr_regency && $scope.data.usr_district) {
					fetcher.getLocation($scope.data.usr_province + '/' + $scope.data.usr_regency + '/' + $scope.data.usr_district, {}, (response) => {
						if (response.response == 'OK' && response.status_code == 200) {
							let mappedResult	= mapName(response.result);
							if ($scope.data.usr_village) { setAuto(mappedResult, $scope.data.usr_village, 'village'); }
							callback(null, mappedResult);
						} else {
							callback(response.message);
						}
					});
				} else {
					callback(null, []);
				}
			},
		}, (err, results) => {
			if (err) { console.log(err); }

			$scope.autoData.province	= results.province;
			$scope.autoData.regency		= results.regency;
			$scope.autoData.district	= results.district;
			$scope.autoData.village		= results.village;

			$scope.inputs	= [
				{ label: 'name', model: 'usr_display_name', tag: 'input', type: 'text', required: true },
				{ label: 'email', model: 'usr_email', tag: 'input', type: 'email', required: true },
				{ label: 'password', model: 'usr_password', tag: 'input', type: 'password', required: true },
				{ label: 'year of born', model: 'usr_year_born', tag: 'input', type: 'number' },
				{ label: 'designation', model: 'usr_designation', tag: 'input', type: 'text' },
				{ label: 'gender', model: 'usr_gender', tag: 'radio', value: [{ label: 'male', value: 'm' }, { label: 'female', value: 'f' }] },
				{ label: 'institution', model: 'usr_institution', tag: 'select', value: results.instits },
				{ label: 'education', model: 'usr_education', tag: 'select', value: results.educats },
				{ label: 'province', model: 'usr_province', tag: 'autocomplete', value: 'province' },
				{ label: 'regency', model: 'usr_regency', tag: 'autocomplete', value: 'regency' },
				{ label: 'district', model: 'usr_district', tag: 'autocomplete', value: 'district' },
				{ label: 'village', model: 'usr_village', tag: 'autocomplete', value: 'village' },
			];
		});
	}

	init();
}]);
