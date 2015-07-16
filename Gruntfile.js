module.exports = function(grunt) {
	'use strict';
	var src = {
		js : ['Gruntfile.js', 'index.js'],
		spec : ['test/']
	};
	grunt.initConfig({
		jshint : {
			all: src.js
		},
		jscs : {
			all: src.js
		},
		/*jscs : disable*/
		jasmine_node : {
			all: {
				options: {
					coverage: {
						print: 'detail',
						reportDir:'reports/coverage/'
					},
					isVerbose: true,
					showColors: true,
					forceExit: true,
					match: '.',
					matchAll: false,
					specFolders: src.spec,
					extensions: 'js',
					specNameMatcher: 'spec',
					captureExceptions: true,
					junitreport: {
						report: false,
						savePath : 'reports/jasmine/',
						useDotNotation: true,
						consolidate: true
					}
				},
				src: src.js
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-jasmine-node');
	grunt.loadNpmTasks('grunt-jasmine-node-coverage');

	grunt.registerTask('test', ['jshint', 'jscs', 'jasmine_node']);
};
