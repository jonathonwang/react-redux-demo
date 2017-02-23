// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine-ajax', 'jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-jasmine-ajax'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      // Launchers
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-firefox-launcher'),
      require('karma-ie-launcher'),
      require('karma-safari-launcher'),
      // Spec Reporters
      require('karma-remap-istanbul'),
      require('karma-spec-reporter'),
      require('karma-osx-reporter')
    ],
    files: [
      './src/ts/tests/unit/karma.entry.ts'
    ],
    preprocessors: {
      './src/ts/tests/unit/karma.entry.ts': ['webpack', 'sourcemap']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    // remapIstanbulReporter: {
    //   reports: {
    //     html: 'coverage',
    //     lcovonly: './coverage/coverage.lcov'
    //   }
    // },
    reporters: [
      'spec',
      'osx'
      // 'progress'
      // 'karma-remap-istanbul'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    osxReporter: {
      notificationMode: 'failChange'
    },
    phantomJsLauncher: {
      exitOnResourceError: true
    },
    webpack: require('./webpack.test-config.babel'),
    webpackServer: {
        noInfo: true
    }
  });
};
