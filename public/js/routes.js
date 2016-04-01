/**
 * Created by oriol on 31/3/16.
 */
// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'mainController'
        })
        .when('/eventos', {
            templateUrl : 'views/eventos.html',
            controller  : 'eventosController'
        })
        .when('/parques', {
            templateUrl : 'views/parques.html',
            controller  : 'parquesController'
        })
        .when('/mapa', {
            templateUrl : 'views/eventos.html',
            controller  : 'mapaController'
        })
        .when('/registro', {
            templateUrl : 'views/registro.html',
            controller  : 'registerController'
        })
        .when('/login', {
            templateUrl : 'views/login.html',
            controller  : 'loginController'
        })
        .when('/users', {
            templateUrl : 'views/users.html',
            controller  : 'usersController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.controller('mainController', function($scope) {
    $scope.message = 'Hola, Mundo!';
});

angularRoutingApp.controller('eventosController', function($scope) {
    $scope.message = 'Esta es la página de eventos';
});

angularRoutingApp.controller('parquesController', function($scope) {
    $scope.message = 'Esta es la página de parques';
});

angularRoutingApp.controller('mapaController', function($scope) {
    $scope.message = 'En este mapa salen los eventos y parques';
});

angularRoutingApp.controller('registerController', function($scope) {
    $scope.message = 'View de registro';
});

angularRoutingApp.controller('usersController', function($scope) {
    $scope.message = 'View de users';
});



