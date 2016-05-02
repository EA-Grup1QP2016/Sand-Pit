/**
 * Created by oriol on 31/3/16.
 */
// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute', 'mapCtrl', 'geolocation', 'gservice', 'kendo.directives']);
var mapCtrl = angular.module('mapCtrl', ['geolocation', 'gservice']);
// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'mapCtrl'
        })
        .when('/parques', {
            templateUrl : 'views/parques.html',
            controller  : 'mapCtrl'
        })
        .when('/eventos', {
            templateUrl : 'views/eventos.html',
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
        .when('/gestion-users', {
            templateUrl : 'views/gestionUsuarios.html',
            controller  : 'usersController'
        })
        .when('/gestion-parques', {
            templateUrl : 'views/gestionParques.html',
            controller  : 'parksController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.controller('mainController', function($scope) {
    $scope.message = 'Hola, Mundooooo!';
});

angularRoutingApp.controller('loginController', function($scope, $http) {
    $scope.loginFacebook = function() {
        $http.get('/profile').success(function(data) {
                console.log('information data', data);
                $rootScope.authenticated = true;
                $location.path('#gestion-users');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.loginTwitter = function() {
        $http.get('/profile').success(function(data) {
                console.log('information data', data);
                $rootScope.authenticated = true;
                $location.path('#gestion-users');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});

angularRoutingApp.controller('mapCtrl', function($scope, $http, $rootScope, geolocation, gservice){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    
    
    
    
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;
    // Set initial coordinates to the center of the US
    $scope.formData.latitude = 41;
    $scope.formData.longitude = 2;
    // Type of sport facilities
    $scope.sport_facilities = [
        "Campo de fútbol",
        "Campo de fútbol 7",
        "Campo de rugby",
        "Campo de hockey",
        "Campo de béisbol",
        "Pista de atletismo",
        "Pista de baloncesto",
        "Pista de voleibol",
        "Pista de vóley playa",
        "Pista de tenis",
        "Pista de bádminton",
        "Pista de patinaje sobre ruedas",
        "Pista de patinaje sobre hielo",
        "Pista de hockey sobre hielo",
        "Pista de frontón",
        "Pista de squash",
        "Pista de padel"
    ];
    // Add facilities to SandPit
    $scope.items = [    ];
    $scope.addFacilitie = function() {
        $scope.items.push($scope.input);
        $scope.input = '';
        $scope.formData.facilities = $scope.items;
        console.log("Instalaciones del parque: ", $scope.formData.facilities)
    };



// Initial Coordinates set
// ...

// Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data){

        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        // Display coordinates in location textboxes rounded to three decimal points
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

        // Display message confirming that the coordinates verified.
        $scope.formData.htmlverified = "Ubicación verificada correctamente";

        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    });

    // Functions
    // ----------------------------------------------------------------------------
    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "Danos permiso para determinar tu ubicación";
        });
    });

    // Creates a new user based on the form fields
    $scope.createSandpit = function(req) {
        console.log(req);
        //if (!req){
        //    console.log("You need to be logged in to create a SandPit")
        //    window.location.href="/";
        //    return;
        //}
        // Grabs all of the text box fields
        var sandpitData = {
            name: $scope.formData.name,
            description: $scope.formData.description,
            price: $scope.formData.price,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified,
            facilities: $scope.formData.facilities,
            //creator: req.email
        };

        // Saves the user data to the db
        $http.post('/sandpit', sandpitData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                $scope.formData.name = "";
                $scope.formData.description = "";
                $scope.formData.price = "";

                // Refresh the map with new data
                gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
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
        if ($scope.edit && (!$scope.fullName.length || !$scope.lName.length || !$scope.newUser.password.length || !$scope.pass2.length)) {
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

angularRoutingApp.controller('parksController', function($scope, $http) {
    $scope.message = 'View de users';
    $scope.newUser = {}; //Limpiamos formulario de registro
    $scope.sandpits = {}; //Limpiamos tabla de usuarios
    $scope.selected = false;
    $scope.header = "Crear usuario"; //Mostramos "Crear usuario" en el panel derecho
    $scope.update = true; //Escondemos el botón update
    $scope.create = false; //Mostramos botñon create
    $scope.error = false;
    $scope.incomplete = false;
    $scope.edit = true;

    // Obtenemos todos los datos de la base de datos
    $http.get('/sandpit').success(function(data) {
            $scope.sandpits = data;
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

    // Función que borra un objeto conocido su id
    $scope.deleteSandpit = function(id) {
        $http.delete('/sandpit/' + id)
            .success(function(data) {
                $scope.sandpits = data;
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


