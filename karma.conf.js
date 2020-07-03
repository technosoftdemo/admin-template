// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

//const process = require('process');process.env.CHROME_BIN = require('puppeteer').executablePath();
const isDocker = require('is-docker');
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-sonarqube-unit-reporter')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/angular-dockerized'),
      reports: ['html', 'lcovonly', 'text-summary','cobertura'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml','sonarqubeUnit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: 'sonar-test-reports/ut_report.xml',
      useBrowserName: false
    },
    customLaunchers: {
      'ChromeHeadless': {
        base: 'Chrome',
        flags: [
          //'--no-sandbox',
          
          isDocker ? '--no-sandbox' : '',
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222'
        ]
      }
    },
    singleRun: true,
    restartOnFileChange: true
  });
};
