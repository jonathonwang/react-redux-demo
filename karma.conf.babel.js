// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-remap-istanbul'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-spec-reporter')
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
      // 'progress'
      // 'karma-remap-istanbul'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'PhantomJS'],
    singleRun: false,
    phantomJsLauncher: {
      exitOnResourceError: true
    },
    webpack: require('./webpack.test-config.babel'),
    webpackServer: {
        noInfo: true
    }
  });
};
