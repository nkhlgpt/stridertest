angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	$routeProvider
		.when("/", {
			templateUrl : '/partials/components/loginform-partial', controller: 'loginformController'
		});
});