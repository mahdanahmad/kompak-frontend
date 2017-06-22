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
						'node_modules/angular/angular.min.js',
						'node_modules/angular-animate/angular-animate.min.js',
						'node_modules/angular-local-storage/dist/angular-local-storage.min.js',
						'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
						'node_modules/ui-router-extras/release/ct-ui-router-extras.min.js',
						'node_modules/angular-permission/dist/angular-permission.min.js',
						'node_modules/angular-permission/dist/angular-permission-ui.min.js',
						'node_modules/angular-loading-bar/build/loading-bar.min.js',
						'node_modules/ng-dialog/js/ngDialog.min.js',
						'node_modules/moment/min/moment.min.js',
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
				    src: ['**/*.js', '!**/print/**', '!additional_libs/*.js'],
				    dest: 'dist/es5/',
				    ext: '.js'
				}]
			}
		},

		processhtml: {
			dist: {
				options: {
					strip: true
				},
				files: [{
					expand: true,
					cwd: 'views/print/',
					src: ['*.html'],
					dest: 'dist/print/',
					ext: '.html'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					minifyCSS: true,
					minifyJS: true
				},
				files: [{
					expand: true,
					cwd: 'dist/print/',
					src: ['*.html'],
					dest: 'dist/print/',
					ext: '.min.html'
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
				files: ['js/**/*.js', '!**/print/**'],
				tasks: ['newer:babel']
			},
			uglify: {
				files: 'dist/es5/**/*.js',
				tasks: ['uglify:dist']
			},
			processhtml: {
				files: ['dist/css/print/*.css', 'js/print/*.js', 'views/print/*.html'],
				tasks: ['processhtml']
			},
			htmlmin: {
				files: ['dist/print/*.html', '!dist/print/*.min.html'],
				tasks: ['newer:htmlmin']
			}
		},
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
	grunt.registerTask('default', ['clean', 'sass', 'cssmin', 'babel', 'uglify', 'processhtml', 'htmlmin']);
	grunt.registerTask('print', ['sass', 'processhtml', 'htmlmin']);

};
