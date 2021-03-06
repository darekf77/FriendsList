'use strict';

module.exports = function(grunt) {
    // Unified Watch Object
    var watchFiles = {
        serverViews: ['app/views/**/*.*'],
        serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
        clientViews: ['public/modules/**/views/**/*.html'],
        clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
        clientCSS: ['public/modules/**/*.css'],
        mochaTests: ['app/tests/**/*.js'],
        documentation: ['README.md']
    };

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            documentation: {
                files: watchFiles.documentation,
                tasks: ['doctor'],
                options: {
                    livereload: true
                }
            },
            serverViews: {
                files: watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: watchFiles.serverJS,
                tasks: ['jshint', 'apidoc'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: watchFiles.clientViews,
                options: {
                    livereload: true,
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: watchFiles.clientCSS,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: watchFiles.clientJS.concat(watchFiles.serverJS),
                options: {
                    jshintrc: true
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc',
            },
            all: {
                src: watchFiles.clientCSS
            }
        },
        uglify: {
            production: {
                options: {
                    mangle: false
                },
                files: {
                    'public/dist/application.min.js': 'public/dist/application.js'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'public/dist/application.min.css': '<%= applicationCSSFiles %>'
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: watchFiles.serverViews.concat(watchFiles.serverJS)
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        ngAnnotate: {
            production: {
                files: {
                    'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch','doctor'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true,
                limit: 10
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            },
            secure: {
                NODE_ENV: 'secure'
            }
        },
        mochaTest: {
            // src: watchFiles.mochaTests,
            // options: {
            //     reporter: 'spec',
            //     require: 'server.js',
            //     captureFile: 'resultsTEST.txt',
            // },
            test: {
                options: {
                    reporter: 'spec',
                    // Require blanket wrapper here to instrument other required 
                    // files on the fly.  
                    // 
                    // NB. We cannot require blanket directly as it 
                    // detects that we are not running mocha cli and loads differently. 
                    // 
                    // NNB. As mocha is 'clever' enough to only run the tests once for 
                    // each file the following coverage task does not actually run any 
                    // tests which is why the coverage instrumentation has to be done here 
                    require: 'server.js',
                },
                src: watchFiles.mochaTests
            },
            'html-cov': {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: 'public/html-cov/index.html'
                },
                src: watchFiles.mochaTests
            },
            'travis-cov': {
                options: {
                    reporter: 'travis-cov'
                },
                src: watchFiles.mochaTests
            }

        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        apidoc: {
            mypp: {
                src: 'app/',
                dest: 'public/apidoc/',
                options: {
                    debug: false,
                    includeFilters: ['.*\\.js$'],
                    excludeFilters: ['node_modules/']
                }
            }
        },
        doctor: {
            default_options: {
                options: {
                    source: watchFiles.documentation,
                    output: 'public/doctor-md',
                    title: 'Usługa sieciowa',
                    logo: null,
                    github: 'https://github.com/dariuszfilipiak/FriendsList'
                    // jsIncludes: ['docs'],
                    // cssIncludes: []
                },
                files: {
                    markdown: './README.md'
                }
            }
        }

    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // A Task for loading the configuration object
    grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
        var init = require('./config/init')();
        var config = require('./config/config');

        grunt.config.set('applicationJavaScriptFiles', config.assets.js);
        grunt.config.set('applicationCSSFiles', config.assets.css);
    });

    // automatic docs
    grunt.loadNpmTasks('grunt-apidoc');
    grunt.loadNpmTasks('grunt-doctor-md');



    // Default task(s).
    grunt.registerTask('default', ['lint', 'concurrent:default']);



    // Debug task.
    grunt.registerTask('debug', ['lint', 'concurrent:debug']);

    // Secure task(s).
    grunt.registerTask('secure', ['env:secure', 'lint', 'concurrent:default']);

    // Lint task(s).
    grunt.registerTask('lint', ['jshint', 'csslint']);

    // Build task(s).
    grunt.registerTask('build', ['lint', 'loadConfig', 'ngAnnotate', 'uglify', 'cssmin']);

    // Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};