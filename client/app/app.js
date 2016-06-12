'use strict';

angular.module('smiteApp', ['smiteApp.auth', 'smiteApp.admin', 'smiteApp.constants', 'ngCookies',
    'ngResource', 'infinite-scroll', 'ngSanitize', 'ngMaterial', 'ui.router', 'ui.bootstrap', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
