'use strict';

angular.module('smiteApp.auth', ['smiteApp.constants', 'smiteApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
