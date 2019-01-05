'use strict';

/**
 * @ngdoc overview
 * @name cloudcompareApp
 * @description
 * # cloudcompareApp
 *
 * Main module of the application.
 */
angular
  .module('cloudcompareApp', [
    'ngAnimate',
    'ngCookies',
    'ngDialog',
    'ngResource',
    'ngRoute',
    'ngSanitize',
		'ngCsv'
  ])
  .config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false});
    $routeProvider
      .when('/', {
//        templateUrl: 'views/main.html',
//        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
