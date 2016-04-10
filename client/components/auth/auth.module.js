'use strict';

angular.module('ejemploApp.auth', [
  'ejemploApp.constants',
  'ejemploApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
