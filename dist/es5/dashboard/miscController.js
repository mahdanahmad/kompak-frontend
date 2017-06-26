'use strict';

app.controller('MiscController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, dialog, globalVar) {
	'use strict';

	$scope.setting = {};
	$scope.categories = {};
	$scope.badges = {};
	$scope.institutions = {};
	$scope.educations = {};

	$scope.settingInputs = [{ label: 'version', model: 'version', tag: 'input', type: 'text' }, { label: 'life', model: 'life', tag: 'input', type: 'number' }, { label: 'number of top score list', model: 'num_top_skor_list', tag: 'input', type: 'number' }];
	$scope.updateSetting = function () {
		fetcher.putSetting(_.mapValues($scope.setting, _.toString), function (response) {
			if (response.response == 'OK' && response.status_code == 200) {
				dialog.notif(globalVar.settingUpdated);
			} else {
				dialog.error(globalVar.globalError);
			}
		});
	};

	$scope.new = function (state) {
		var funcName = _.includes(['institution', 'education'], state) ? 'loneDialog' : state + 'Dialog';
		dialog[funcName](_.includes(['institution', 'education'], state) ? { state: state } : {}, function (dialResp) {
			if (_.isObject(dialResp)) {
				if (!_.isNil(dialResp.category_enabled)) {
					dialResp.category_enabled = dialResp.category_enabled ? '1' : '0';
				}
				if (!_.isNil(dialResp.name) && state == 'institution') {
					dialResp.name_institution = dialResp.name;
				}
				if (!_.isNil(dialResp.name) && state == 'education') {
					dialResp.education = dialResp.name;
				}
				fetcher['post' + _.upperFirst(state)](_.mapValues(dialResp, _.toString), function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						fetch[state]();
					}
				});
			}
		});
	};

	$scope.edit = function (o, state) {
		var funcName = _.includes(['institution', 'education'], state) ? 'loneDialog' : state + 'Dialog';
		var id = null;
		var content = null;
		switch (state) {
			case 'category':
				id = o.ID_category;content = _.clone(o);break;
			case 'badge':
				id = o.ID_Badge;content = _.clone(o);break;
			default:
				id = o.id;content = { data: _.chain(o).clone().mapKeys(function (o, key) {
						return _.includes(['name_institution', 'education'], key) ? 'name' : key;
					}).value(), state: state };
		}

		dialog[funcName](content, function (dialResp) {
			if (_.isObject(dialResp)) {
				if (!_.isNil(dialResp.category_enabled)) {
					dialResp.category_enabled = dialResp.category_enabled ? '1' : '0';
				}
				if (!_.isNil(dialResp.name) && state == 'institution') {
					dialResp.name_institution = dialResp.name;
				}
				if (!_.isNil(dialResp.name) && state == 'education') {
					dialResp.education = dialResp.name;
				}
				fetcher['put' + _.upperFirst(state)](id, _.mapValues(dialResp, _.toString), function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						fetch[state]();
					} else {
						dialog.error(response.message);
					}
				});
			}
		});
	};

	$scope.delete = function (id, name, state, e) {
		e.stopPropagation();
		dialog.confirm('Are you sure you wanna delete ' + state + ' \"' + name + '\"?', function (response) {
			if (response) {
				fetcher['delete' + _.upperFirst(state)](id, function (response) {
					if (response.response == 'OK' && response.status_code == 200) {
						fetch[state]();
					} else {
						dialog.error(response.message);
					}
				});
			}
		});
	};

	$scope.changeEna = function (o, e) {
		e.stopPropagation();
		var category_enabled = o.category_enabled ? '0' : '1';

		fetcher.putCategory(o.ID_category, { category_enabled: category_enabled }, function (response) {
			if (response.response == 'OK' && response.status_code == 200) {
				o.category_enabled = !o.category_enabled;
			}
		});
	};

	var fetch = {
		setting: function setting() {
			fetcher.getSetting(function (response) {
				if (response.response == 'OK' && response.status_code == 200) {
					$scope.setting = response.result;
				}
			});
		},
		category: function category() {
			fetcher.getAllCategory({}, function (response) {
				if (response.response == 'OK' && response.status_code == 200) {
					$scope.categories = response.result;
				}
			});
		},
		badge: function badge() {
			fetcher.getAllBadge({}, function (response) {
				if (response.response == 'OK' && response.status_code == 200) {
					$scope.badges = response.result;
				}
			});
		},
		institution: function institution() {
			fetcher.getAllInstitution({}, function (response) {
				if (response.response == 'OK' && response.status_code == 200) {
					$scope.institutions = response.result;
				}
			});
		},
		education: function education() {
			fetcher.getAllEducation({}, function (response) {
				if (response.response == 'OK' && response.status_code == 200) {
					$scope.educations = response.result;
				}
			});
		}
	};

	var init = function init() {
		fetch.setting();fetch.category();fetch.badge();fetch.institution();fetch.education();
	};

	init();
}]);
//# sourceMappingURL=miscController.js.map
