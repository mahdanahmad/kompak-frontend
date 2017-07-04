app.controller('MiscController', ['$scope', 'fetcher', '$timeout', 'dialog', 'globalVar', function ($scope, fetcher, $timeout, dialog, globalVar) {
    'use strict';
	$scope.setting			= {};
	$scope.categories		= {};
	$scope.badges			= {};
	$scope.institutions		= {};
	$scope.educations		= {};

	let settingMap			= {
		badge: 'lencana',
		category: 'kategori',
		education: 'pendidikan',
		institution: 'lembaga'
	};

	$scope.settingInputs	= [
		{ label: 'versi aplikasi', model: 'version', tag: 'input', type: 'text' },
		{ label: 'life', model: 'life', tag: 'input', type: 'number' },
		{ label: 'jumlah pemain pada daftar top score', model: 'num_top_skor_list', tag: 'input', type: 'number' },
	];
	$scope.updateSetting	= () => {
		fetcher.putSetting(_.mapValues($scope.setting, _.toString), (response) => {
			if (response.response == 'OK' && response.status_code == 200) {
				dialog.notif(globalVar.settingUpdated);
			} else {
				dialog.error(globalVar.globalError);
			}
		});
	}

	$scope.new		= (state) => {
		let funcName	= _.includes(['institution', 'education'], state) ? 'loneDialog' : (state + 'Dialog');
		dialog[funcName](_.includes(['institution', 'education'], state) ? { state } : {}, (dialResp) => {
			if (_.isObject(dialResp)) {
				if (!_.isNil(dialResp.category_enabled)) { dialResp.category_enabled = (dialResp.category_enabled) ? '1' : '0'; }
				if (!_.isNil(dialResp.name) && state == 'institution') { dialResp.name_institution = dialResp.name; }
				if (!_.isNil(dialResp.name) && state == 'education') { dialResp.education = dialResp.name; }
				fetcher['post' + _.upperFirst(state)](_.mapValues(dialResp, _.toString), (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						fetch[state]();
					}
				});
			}
		});
	}

	$scope.edit	= (o, state) => {
		let funcName	= _.includes(['institution', 'education'], state) ? 'loneDialog' : (state + 'Dialog');
		let id			= null;
		let content		= null;
		switch (state) {
			case 'category': id = o.ID_category; content = _.clone(o); break;
			case 'badge': id = o.ID_Badge; content = _.clone(o); break;
			default: id	= o.id; content = { data: _.chain(o).clone().mapKeys((o, key) => (_.includes(['name_institution', 'education'], key) ? 'name' : key)).value(), state }
		}

		dialog[funcName](content, (dialResp) => {
			if (_.isObject(dialResp)) {
				if (!_.isNil(dialResp.category_enabled)) { dialResp.category_enabled = (dialResp.category_enabled) ? '1' : '0'; }
				if (!_.isNil(dialResp.name) && state == 'institution') { dialResp.name_institution = dialResp.name; }
				if (!_.isNil(dialResp.name) && state == 'education') { dialResp.education = dialResp.name; }
				fetcher['put' + _.upperFirst(state)](id, _.mapValues(dialResp, _.toString), (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						fetch[state]();
					} else {
						dialog.error(response.message);
					}
				});
			}
		});
	};

	$scope.delete	= (id, name, state, e) => {
		e.stopPropagation();
		dialog.confirm('Apakah anda yakin akan menghapus ' + settingMap[state] + ' \"' + name + '\"?', (response) => {
			if (response) {
				fetcher['delete' + _.upperFirst(state)](id, (response) => {
					if (response.response == 'OK' && response.status_code == 200) {
						fetch[state]();
					} else {
						dialog.error(response.message);
					}
				});
			}
		});
	}

	$scope.changeEna	= (o, e) => {
		e.stopPropagation();
		let category_enabled = o.category_enabled ? '0' : '1';

		fetcher.putCategory(o.ID_category, { category_enabled }, (response) => {
			if (response.response == 'OK' && response.status_code == 200) { o.category_enabled	= !o.category_enabled; }
		});
	};

	let fetch	= {
		setting: () => { fetcher.getSetting((response) => { if (response.response == 'OK' && response.status_code == 200) { $scope.setting = response.result; }}); },
		category: () => { fetcher.getAllCategory({}, (response) => { if (response.response == 'OK' && response.status_code == 200) { $scope.categories = response.result; }}); },
		badge: () => { fetcher.getAllBadge({}, (response) => { if (response.response == 'OK' && response.status_code == 200) { $scope.badges = response.result; }}); },
		institution: () => { fetcher.getAllInstitution({}, (response) => { if (response.response == 'OK' && response.status_code == 200) { $scope.institutions = response.result; }}); },
		education: () => { fetcher.getAllEducation({}, (response) => { if (response.response == 'OK' && response.status_code == 200) { $scope.educations = response.result; }}); },
	}


	let init = () => { fetch.setting(); fetch.category(); fetch.badge(); fetch.institution(); fetch.education(); }

	init();
}]);
