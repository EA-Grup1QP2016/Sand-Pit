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
        .when('/registro', {
            templateUrl : 'views/registro.html',
            controller  : 'registerController'
        })
        .when('/login', {
            templateUrl : 'views/login.html',
            controller  : 'loginController'
        })
        .when('/users', {
            templateUrl : 'views/users1.html',
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

angularRoutingApp.controller('registerController', function($scope, $http) {
    $scope.message = 'View de registro';

    $scope.newUser = {}; //Limpiamos formulario de registro
    $scope.users = {}; //Limpiamos tabla de usuarios
    $scope.selected = false;
    $scope.header = "Crear usuario"; //Mostramos "Crear usuario" en el panel derecho
    $scope.update = true; //Escondemos el botón update
    $scope.create = false; //Mostramos botñon create
    $scope.error = false;
    $scope.incomplete = false;
    $scope.edit = true;


    // Función para registrar un user
    $scope.createUser = function() {
        $http.post('/user', $scope.newUser)
            .success(function(data) {
                $scope.newUser = {}; // Borramos los datos del formulario
                $scope.users = data;
                $scope.pass2 = {};
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;
    $scope.hideform = true;

    $scope.$watch('newUser.password',function() {$scope.test();});
    $scope.$watch('pass2',function() {$scope.test();});
    $scope.$watch('fullName', function() {$scope.test();});



    $scope.test = function() {
        if ($scope.newUser.password !== $scope.pass2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.fullName.length ||
            !$scope.lName.length ||
            !$scope.newUser.password.length || !$scope.pass2.length)) {
            $scope.incomplete = true;
        }
    };
});

angularRoutingApp.controller('usersController', function($scope, $http) {
    $scope.message = 'View de users';

    $scope.newUser = {}; //Limpiamos formulario de registro
    $scope.users = {}; //Limpiamos tabla de usuarios
    $scope.selected = false;
    $scope.header = "Crear usuario"; //Mostramos "Crear usuario" en el panel derecho
    $scope.update = true; //Escondemos el botón update
    $scope.create = false; //Mostramos botñon create
    $scope.error = false;
    $scope.incomplete = false;
    $scope.edit = true;

    // Obtenemos todos los datos de la base de datos
    $http.get('/user').success(function(data) {
            $scope.users = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Función para registrar un user
    $scope.createUser = function() {
        $http.post('/user', $scope.newUser)
            .success(function(data) {
                $scope.newUser = {}; // Borramos los datos del formulario
                $scope.users = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función que borra un objeto user conocido su id
    $scope.deleteUser = function(id) {
        $http.delete('/user/' + id)
            .success(function(data) {
                $scope.newUSER = {};
                $scope.users = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    // Función para coger el objeto seleccionado en la tabla antes de editarlo
    $scope.selectUser = function(user) {
        $scope.newUser = user;
        $scope.selected = true;
        $scope.header = "Editar usuario";
        $scope.update = false;
        $scope.create = true;

        console.log($scope.newUser, $scope.selected);
    };

    // Función para editar los datos de una persona
    $scope.editUser = function() {
        $http.put('/user/' + $scope.newUser._id, $scope.newUser)
            .success(function(data) {
                $scope.newUser = {}; // Borramos los datos del formulario
                $scope.users = data;
                $scope.selected = false;
                $scope.header = "Crear usuario";
                $scope.update = true;
                $scope.create = false;
            })
            .error(function(data) {
                $scope.header = "Crear usuario";
                $scope.update = true;
                $scope.create = false;
                console.log('Error: ' + data);
            });
    };

    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;
    $scope.hideform = true;

    $scope.$watch('newUser.password',function() {$scope.test();});
    $scope.$watch('pass2',function() {$scope.test();});
    $scope.$watch('fullName', function() {$scope.test();});



    $scope.test = function() {
        if ($scope.newUser.password !== $scope.pass2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.fullName.length ||
            !$scope.lName.length ||
            !$scope.newUser.password.length || !$scope.pass2.length)) {
            $scope.incomplete = true;
        }
    };
});



