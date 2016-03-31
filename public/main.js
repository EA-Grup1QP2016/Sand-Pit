//Enrutamiento de las vistas de la app

// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'index.html',
            controller  : 'mainController'
        })
        .when('/login', {
            templateUrl : 'login.html',
            controller  : 'loginController'
        })
        .when('/register', {
            templateUrl : 'registrarse.html',
            controller  : 'registerController'
        })
        .when('/acerca', {
            templateUrl : 'pages/acerca.html',
            controller  : 'acercaController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.controller('mainController', function($scope) {
    $scope.message = 'Página principal';
});

angularRoutingApp.controller('loginController', function($scope) {
    $scope.message = 'Página login';
});

angularRoutingApp.controller('registerController', function($scope) {
    $scope.message = 'página register';
});

angularRoutingApp.controller('acercaController', function($scope) {
    $scope.message = 'Somos Marc, Feliu, Fava, Alejandro y Uri!';
});