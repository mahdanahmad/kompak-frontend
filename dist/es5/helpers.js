'use strict';

app.factory('dialog', ['ngDialog', function (ngDialog) {
	'use strict';

	var createDialog = function createDialog(content, template, controller, width, showClose, additionalClass) {
		return ngDialog.open({
			template: 'views/dialogs/' + template + '.html',
			className: 'ngdialog-theme-default' + (additionalClass ? ' ' + additionalClass : ''),
			data: { content: content },
			width: width ? width : 450,
			showClose: showClose ? showClose : false,
			controller: controller
		});
	};

	return {
		userDialog: function userDialog(content, callback) {
			var dialog = createDialog(content, 'user', 'ModalUserController', 1000);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		choicesDialog: function choicesDialog(content, callback) {
			var dialog = createDialog(content, 'choices', 'ModalChoicesController', 1000);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		essayDialog: function essayDialog(content, callback) {
			var dialog = createDialog(content, 'essay', 'ModalEssayController', 1000);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		locationDialog: function locationDialog(content, callback) {
			var dialog = createDialog(content, 'location', 'ModalLocationController', 600);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		categoryDialog: function categoryDialog(content, callback) {
			var dialog = createDialog(content, 'category', 'ModalCategoryController', 600);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		badgeDialog: function badgeDialog(content, callback) {
			var dialog = createDialog(content, 'badge', 'ModalBadgeController', 750);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		loneDialog: function loneDialog(content, callback) {
			var dialog = createDialog(content, 'lone', 'ModalLoneController', 600);
			dialog.closePromise.then(function (data) {
				callback(data.value);
			});
		},
		confirm: function confirm(content, callback) {
			var dialog = createDialog(content, 'confirm', ['$scope', function ($scope) {}]);
			dialog.closePromise.then(function (data) {
				callback(data.value == 'yes');
			});
		},
		notif: function notif(content) {
			var dialog = createDialog(content, 'notif', ['$scope', '$sce', function ($scope, $sce) {
				$scope.trust = function (string) {
					return $sce.trustAsHtml(string);
				};
			}], 600);
			// dialog.closePromise.then((data) => { callback(); });
		},
		error: function error(content) {
			var dialog = createDialog(content, 'error', ['$scope', function ($scope) {}]);
			// dialog.closePromise.then((data) => { callback(); });
		}
	};
}]);

app.factory('globalVar', [function () {
	'use strict';

	return {
		nodata: 'no data available at this point.',
		loading: 'loading data',
		globalError: 'something something happened. please smell your coffee while we fixing this.',
		settingUpdated: 'pengaturan berhasil diperbarui.',

		userHint: '<ol>' + '<li>Anda dapat mencari pemain melalui nama dengan mengetik pada kolom yang disediakan.</li>' + '<li>Urutan daftar pemain dapat diubah dengan cara menekan kata "urutan" dan memilih urutan yang telh disediakan.</li>' + '<li>Pemain baru dapat ditambahkan melalu tombol <i class="fa fa-plus" aria-hidden="true"></i> Pemain Baru.</li>' + '<li>Warna pada bagian kiri melambangkan <span style="color: #b24f9c;">pemain wanita</span> dan <span style="color: #41658A"> pemain pria</span>.</li>' + '<li>Icon <i class="fa fa-envelope-open" aria-hidden="true"></i> digunakan untuk mengirim email berisi reset password ke email pemain yang telah terdaftar.</li>' + '<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus pemain.</li>' + '<li>Anda dapat melihat atau mengubah data pemain dengan cara menekan kotak yang anda inginkan.</li>' + '<ol>',
		choicesHint: '<ol>' + '<li>Anda dapat mencari pertanyaan pilihan ganda berdasarkan pertanyaan dengan mengetik pada kolom yang disediakan.</li>' + '<li>Pertanyaan pilihan ganda dapat difilter berdasarkan kategori dengan menekan kata "kategori".</li>' + '<li>Pertanyaan pilihan ganda baru dapat ditambahkan melalu tombol <i class="fa fa-plus" aria-hidden="true"></i> Pertanyaan Baru.</li>' + '<li><span style="color: #FC7E01;">Warna pada latar</span> melambangkan pertanyaan yang tidak aktif.' + '<li>Icon <i class="fa fa-dot-circle-o" aria-hidden="true"></i> melambangkan pertanyaan aktif dan <i class="fa fa-circle" aria-hidden="true"></i> melambangkan pertanyaan yang tidak aktif. Anda dapat merubah status aktif pertanyaan dengan menekan icon ini.</li>' + '<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus pertanyaan.</li>' + '<li>Anda dapat melihat atau mengubah data pertanyaan pilihan ganda dengan cara menekan kotak yang anda inginkan.</li>' + '<ol>',
		choicesAnsHint: '<ol>' + '<li>Anda dapat mencari jawaban pilihan ganda berdasarkan nama user dengan mengetik pada kolom yang disediakan.</li>' + '<li>Jawaban pilihan ganda dapat difilter berdasarkan kategori dengan menekan kata "kategori".</li>' + '<li><span style="color: #BB342F;">Warna pada latar</span> melambangkan jawaban yang salah.' + '<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus pertanyaan.</li>' + '<ol>',
		essayHint: '<ol>' + '<li>Anda dapat mencari pertanyaan essay berdasarkan pertanyaan dengan mengetik pada kolom yang disediakan.</li>' + '<li>Pertanyaan essay dapat difilter berdasarkan kategori dengan menekan kata "kategori".</li>' + '<li>Pertanyaan essay baru dapat ditambahkan melalu tombol <i class="fa fa-plus" aria-hidden="true"></i> Pertanyaan Baru.</li>' + '<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus pertanyaan.</li>' + '<li>Anda dapat melihat atau mengubah data pertanyaan essay dengan cara menekan kotak yang anda inginkan.</li>' + '<ol>',
		essayAnsHint: '<ol>' + '<li>Anda dapat mencari jawaban essay berdasarkan nama user dengan mengetik pada kolom yang disediakan.</li>' + '<li>Jawaban essay dapat difilter berdasarkan kategori dengan menekan kata "kategori".</li>' + '<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus pertanyaan.</li>' + '<ol>',
		locationHint: '<ol>' + '<li>Anda dapat mencari lokasi berdasarkan nama lokasi dengan mengetik pada kolom yang disediakan.</li>' + '<li>Lokasi baru dapat ditambahkan melalu tombol <i class="fa fa-plus" aria-hidden="true"></i> (lokasi) Baru.</li>' + '<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus lokasi.</li>' + '<li>Icon <i class="fa fa-pencil" aria-hidden="true"></i> dapat digunakan untuk mengubah lokasi.</li>' + '<li>Anda dapat melakukan navigasi ke detil lokasi dengan menekan kotak lokasi yang anda inginkan. Untuk kembali ke level sebelumnya, anda dapat menekan nama lokasi pada bagian kiri atas.</li>' + '<ol>',
		miscHint: '<ol>' + '<li>Anda dapat mengubah pengaturan aplikasi dengan cara mengganti nilai pada kolom yang anda inginkan, data akan disimpan setelah anda menekan tombol "perbarui".</li>' + '<li>Icon <i class="fa fa-dot-circle-o" aria-hidden="true"></i> melambangkan kategori aktif dan <i class="fa fa-circle" aria-hidden="true"></i> melambangkan kategori yang tidak aktif. Anda dapat merubah status aktif kategori dengan menekan icon ini.</li>' + '<li>(kategori / lencana / lembaga / pendidikan) baru dapat ditambahkan melalui tombol pada bagian kanan bawah setiap section.</li>' + '<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus (kategori / lencana / lembaga / pendidikan).</li>' + '<li>Anda dapat melihat atau mengubah data (kategori / lencana / lembaga / pendidikan) dengan cara menekan kotak yang anda inginkan.</li>' + '<ol>'
	};
}]);
//# sourceMappingURL=helpers.js.map
