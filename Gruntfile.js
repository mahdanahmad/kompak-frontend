module.exports = function(grunt){
	grunt.initConfig({
		// pkg	: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: 'stylesheets/',
					src: ['**/*.scss'],
					dest: 'dist/css/',
					ext: '.css'
				}]
			}
		},

		cssmin: {
			options: {
				mergeIntoShorthands: false,
				specialComments: -1,
				compatibility: { properties: { urlQuotes: true } },
				rebase: true,
				rebaseTo: 'dist/css/'
			},
			components: {
				files: {
					'dist/css/components.min.css': [
						'node_modules/font-awesome/css/font-awesome.min.css',
						'node_modules/ng-dialog/css/ngDialog.min.css',
						'node_modules/ng-dialog/css/ngDialog-theme-default.min.css',
						'node_modules/angular-loading-bar/build/loading-bar.min.css',
						'node_modules/angular-material/angular-material.min.css',
						'node_modules/nvd3/build/nv.d3.min.css',
					]
				}
			}
		},

		uglify: {
			components: {
				options: {
					sourceMap: true,
					// sourceMapName: 'dist/js/components.map'
				},
				files: {
					'dist/js/components.min.js': [
						'node_modules/jquery/dist/jquery.min.js',
						'node_modules/jquery-bridget/jquery-bridget.js',
						'node_modules/ev-emitter/ev-emitter.js',
						'node_modules/desandro-matches-selector/matches-selector.js',
						'node_modules/fizzy-ui-utils/utils.js',
						'node_modules/get-size/get-size.js',
						'node_modules/outlayer/item.js',
						'node_modules/outlayer/outlayer.js',
						'node_modules/masonry-layout/masonry.js',
						'node_modules/imagesloaded/imagesloaded.js',

						'node_modules/angular/angular.min.js',
						'node_modules/angular-animate/angular-animate.min.js',
						'node_modules/angular-sanitize/angular-sanitize.min.js',
						'node_modules/angular-material/angular-material.min.js',
						'node_modules/angular-aria/angular-aria.min.js',
						'node_modules/angular-local-storage/dist/angular-local-storage.min.js',
						'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
						'node_modules/ui-router-extras/release/ct-ui-router-extras.min.js',
						'node_modules/angular-permission/dist/angular-permission.min.js',
						'node_modules/angular-permission/dist/angular-permission-ui.min.js',
						'node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min.js',
						'node_modules/angular-loading-bar/build/loading-bar.min.js',
						'node_modules/ng-dialog/js/ngDialog.min.js',
						'node_modules/angular-masonry/angular-masonry.js',

						'node_modules/d3/d3.min.js',
						'node_modules/nvd3/build/nv.d3.min.js',
						'node_modules/angular-nvd3/dist/angular-nvd3.min.js',

						// 'node_modules/chart.js/dist/Chart.min.js',
						// 'node_modules/angular-chart.js/dist/angular-chart.min.js',

						'node_modules/moment/min/moment.min.js',
						'node_modules/moment/locale/id.js',
						'node_modules/lodash/lodash.min.js',
						'node_modules/async/dist/async.min.js',

					]
				}
			},
			dist: {
				options: {
					sourceMap: true,
					// sourceMapName: 'dist/js/main.map'
				},
				src: 'dist/es5/**/*.js',
				dest: 'dist/js/main.min.js'
			}
		},

		babel: {
			options: {
				sourceMap: true,
				presets: ['es2015']
			},
			dist: {
				files: [{
				    expand: true,
				    cwd: 'js',
				    src: ['**/*.js'],
				    dest: 'dist/es5/',
				    ext: '.js'
				}]
			}
		},

		clean: {
			dist: ['dist']
		},

		watch: {
			sass: {
				files: 'stylesheets/**/*.scss',
				tasks: ['sass']
			},
			babel: {
				files: ['js/**/*.js'],
				tasks: ['newer:babel']
			},
			uglify: {
				files: 'dist/es5/**/*.js',
				tasks: ['uglify:dist']
			},
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	// Default tasks
	grunt.registerTask('default', ['clean', 'sass', 'cssmin', 'babel', 'uglify']);

};
