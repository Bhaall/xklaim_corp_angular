'use strict';

var xkl = angular.module('xkl', ['ngSanitize', 'ngTouch']);

xkl.config(function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);//.hashPrefix('!');
	$routeProvider
        	.when('/home',
            	{
                		controller: 'infoCtrl',
                		templateUrl: 'partials/home.html',
                		title: 'Home'
            	})
        	.when('/info',
            	{
                		controller: 'infoCtrl',
                		templateUrl: 'partials/info.html',
                		title: 'Contact'
            	})
        	.when('/404',
            	{
                		controller: '404Ctrl',
                		templateUrl: 'partials/404.html',
                		title: '404'
            	})
        	.otherwise({ redirectTo: '/home'
        });
});