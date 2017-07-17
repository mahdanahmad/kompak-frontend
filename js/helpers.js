app.factory('dialog', ['ngDialog', function(ngDialog) {
	'use strict';

	let createDialog = (content, template, controller, width, showClose, additionalClass) => (
		ngDialog.open({
			template: 'views/dialogs/' + template + '.html',
			className: 'ngdialog-theme-default' + (additionalClass ? (' ' + additionalClass) : ''),
			data: { content: content },
			width: width ? width : 450,
			showClose: showClose ? showClose : false,
			controller
		})
	);

	return {
		userDialog: (content, callback) => {
			let dialog	= createDialog(content, 'user', 'ModalUserController', 1000);
			dialog.closePromise.then((data) => { callback(data.value); });
		},
		adminDialog: (content, callback) => {
			let dialog	= createDialog(content, 'admin', 'ModalAdminController', 1000);
			dialog.closePromise.then((data) => { callback(data.value); });
		},
		profileDialog: (content, callback) => {
			let dialog	= createDialog(content, 'profile', 'ModalProfileController', 600);
			dialog.closePromise.then((data) => { callback(data.value); });
		},
		choicesDialog: (content, callback) => {
			let dialog	= createDialog(content, 'choices', 'ModalChoicesController', 1000);
			dialog.closePromise.then((data) => { callback(data.value); });
		},
		essayDialog: (content, callback) => {
			let dialog	= createDialog(content, 'essay', 'ModalEssayController', 1000);
			dialog.closePromise.then((data) => { callback(data.value); });
		},
		locationDialog: (content, callback) => {
			let dialog	= createDialog(content, 'location', 'ModalLocationController', 600);
			dialog.closePromise.then((data) => { callback(data.value); });
		},
		categoryDialog: (content, callback) => {
			let dialog	= createDialog(content, 'category', 'ModalCategoryController', 600);
			dialog.closePromise.then((data) => { callback(data.value); });
		},
		badgeDialog: (content, callback) => {
			let dialog	= createDialog(content, 'badge', 'ModalBadgeController', 750);
			dialog.closePromise.then((data) => { callback(data.value); });
		},
		loneDialog: (content, callback) => {
			let dialog	= createDialog(content, 'lone', 'ModalLoneController', 600);
			dialog.closePromise.then((data) => { callback(data.value); });
		},
		listDialog: (content, callback) => {
			let dialog	= createDialog(content, 'list', ['$scope', ($scope) => { }], 750);
			// dialog.closePromise.then((data) => { callback(data.value); });
		},
		confirm: (content, callback) => {
			let dialog	= createDialog(content, 'confirm', ['$scope', ($scope) => { }]);
			dialog.closePromise.then((data) => { callback(data.value == 'yes'); });
		},
		notif: (content) => {
			let dialog	= createDialog(content, 'notif', ['$scope', '$sce', ($scope, $sce) => { $scope.trust = (string) => ($sce.trustAsHtml(string)); }], 600);
			// dialog.closePromise.then((data) => { callback(); });
		},
		error: (content) => {
			let dialog	= createDialog(content, 'error', ['$scope', ($scope) => { }]);
			// dialog.closePromise.then((data) => { callback(); });
		},
	}

}]);

app.factory('globalVar', [function() {
	'use strict';

	return {
		nodata: 'no data available at this point.',
		loading: 'loading data',
		dateFormat: 'YYYY-MM-DD',
		globalError: 'something something happened. please smell your coffee while we fixing this.',
		settingUpdated: 'pengaturan berhasil diperbarui.',
		questionStatus: {
			0: 'Sedang direview',
			1: 'Disetujui',
			2: 'Ditolak'
		},
		userHint: 		'<ol>' +
			 				'<li>Anda dapat mencari pemain melalui nama dengan mengetik pada kolom yang disediakan.</li>' +
			 				'<li>Urutan daftar pemain dapat diubah dengan cara menekan kata "urutan" dan memilih urutan yang telh disediakan.</li>' +
			 				'<li>Pemain baru dapat ditambahkan melalu tombol <i class="fa fa-plus" aria-hidden="true"></i> Pemain Baru.</li>' +
			 				'<li>Warna pada bagian kiri melambangkan <span style="color: #b24f9c;">pemain wanita</span> dan <span style="color: #41658A"> pemain pria</span>.</li>' +
			 				'<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus pemain.</li>' +
			 				'<li>Anda dapat melihat atau mengubah data pemain dengan cara menekan kotak yang anda inginkan.</li>' +
						'<ol>',
		adminHint: 		'<ol>' +
			 				'<li>Anda dapat mencari admin melalui nama dengan mengetik pada kolom yang disediakan.</li>' +
			 				'<li>Pemain baru dapat ditambahkan melalu tombol <i class="fa fa-plus" aria-hidden="true"></i> Admin Baru.</li>' +
			 				'<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus admin.</li>' +
			 				'<li>Anda dapat melihat atau mengubah data pemain dengan cara menekan kotak yang anda inginkan.</li>' +
						'<ol>',
		choicesHint: 	'<ol>' +
			 				'<li>Anda dapat mencari pertanyaan pilihan ganda berdasarkan pertanyaan dengan mengetik pada kolom yang disediakan.</li>' +
			 				'<li>Pertanyaan pilihan ganda dapat difilter berdasarkan kategori dengan menekan kata "kategori".</li>' +
			 				'<li>Pertanyaan pilihan ganda baru dapat ditambahkan melalu tombol <i class="fa fa-plus" aria-hidden="true"></i> Pertanyaan Baru.</li>' +
			 				'<li><span style="color: #FC7E01;">Warna pada latar</span> melambangkan pertanyaan belum direview dan menunggu konfirmasi anda.' +
			 				'<li><span style="color: #79afb1;">Warna pada latar</span> melambangkan pertanyaan yang tidak aktif.' +
			 				'<li><span style="color: firebrick;">Warna pada latar</span> melambangkan pertanyaan yang ditolak.' +
			 				'<li>Icon <i class="fa fa-dot-circle-o" aria-hidden="true"></i> melambangkan pertanyaan aktif dan <i class="fa fa-circle" aria-hidden="true"></i> melambangkan pertanyaan yang tidak aktif. Anda dapat merubah status aktif pertanyaan dengan menekan icon ini.</li>' +
							'<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus pertanyaan.</li>' +
							'<li>Anda dapat melihat atau mengubah data pertanyaan pilihan ganda dengan cara menekan kotak yang anda inginkan.</li>' +
						'<ol>',
		choicesAnsHint:	'<ol>' +
			 				'<li>Anda dapat mencari jawaban pilihan ganda berdasarkan nama user dengan mengetik pada kolom yang disediakan.</li>' +
			 				'<li>Jawaban pilihan ganda dapat difilter berdasarkan kategori dengan menekan kata "kategori".</li>' +
			 				'<li><span style="color: #BB342F;">Warna pada latar</span> melambangkan jawaban yang salah.' +
							'<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus pertanyaan.</li>' +
						'<ol>',
		essayHint: 		'<ol>' +
			 				'<li>Anda dapat mencari pertanyaan essay berdasarkan pertanyaan dengan mengetik pada kolom yang disediakan.</li>' +
			 				'<li>Pertanyaan essay dapat difilter berdasarkan kategori dengan menekan kata "kategori".</li>' +
			 				'<li>Pertanyaan essay baru dapat ditambahkan melalu tombol <i class="fa fa-plus" aria-hidden="true"></i> Pertanyaan Baru.</li>' +
							'<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus pertanyaan.</li>' +
							'<li>Anda dapat melihat atau mengubah data pertanyaan essay dengan cara menekan kotak yang anda inginkan.</li>' +
						'<ol>',
		essayAnsHint: 	'<ol>' +
			 				'<li>Anda dapat mencari jawaban essay berdasarkan nama user dengan mengetik pada kolom yang disediakan.</li>' +
			 				'<li>Jawaban essay dapat difilter berdasarkan kategori dengan menekan kata "kategori".</li>' +
							'<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus pertanyaan.</li>' +
						'<ol>',
		locationHint: 	'<ol>' +
			 				'<li>Anda dapat mencari lokasi berdasarkan nama lokasi dengan mengetik pada kolom yang disediakan.</li>' +
			 				'<li>Lokasi baru dapat ditambahkan melalu tombol <i class="fa fa-plus" aria-hidden="true"></i> (lokasi) Baru.</li>' +
							'<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus lokasi.</li>' +
							'<li>Icon <i class="fa fa-pencil" aria-hidden="true"></i> dapat digunakan untuk mengubah lokasi.</li>' +
							'<li>Anda dapat melakukan navigasi ke detil lokasi dengan menekan kotak lokasi yang anda inginkan. Untuk kembali ke level sebelumnya, anda dapat menekan nama lokasi pada bagian kiri atas.</li>' +
						'<ol>',
		miscHint: 		'<ol>' +
			 				'<li>Anda dapat mengubah pengaturan aplikasi dengan cara mengganti nilai pada kolom yang anda inginkan, data akan disimpan setelah anda menekan tombol "perbarui".</li>' +
			 				'<li>Icon <i class="fa fa-dot-circle-o" aria-hidden="true"></i> melambangkan kategori aktif dan <i class="fa fa-circle" aria-hidden="true"></i> melambangkan kategori yang tidak aktif. Anda dapat merubah status aktif kategori dengan menekan icon ini.</li>' +
			 				'<li>(kategori / lencana / lembaga / pendidikan) baru dapat ditambahkan melalui tombol pada bagian kanan bawah setiap section.</li>' +
			 				'<li>Icon <i class="fa fa-times" aria-hidden="true"></i> dapat digunakan untuk menghapus (kategori / lencana / lembaga / pendidikan).</li>' +
							'<li>Anda dapat melihat atau mengubah data (kategori / lencana / lembaga / pendidikan) dengan cara menekan kotak yang anda inginkan.</li>' +
						'<ol>',
		logsHint: 		'<ol>' +
			 				'<li>Anda dapat mencari logs berdasarkan nama admin dengan mengetik pada kolom yang disediakan.</li>' +
			 				'<li>Log dapat difilter berdasarkan aksi dengan menekan kata "aksi".</li>' +
			 				'<li>Warna pada latar menunjukkan aksi <span style="color: #949B26;">pengubahan data</span>, <span style="color: #79afb1;">pengisian data</span>, dan <span style="color: #BB342F;">penghapusan data</span>.' +
						'<ol>',
	}
}]);
