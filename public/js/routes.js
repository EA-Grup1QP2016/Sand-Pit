/**
 * Created by oriol on 31/3/16.
 */
// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute', 'mapCtrl', 'geolocation', 'gservice', 'kendo.directives']);
var mapCtrl = angular.module('mapCtrl', ['geolocation', 'gservice']);
// Configuración de las rutas
angularRoutingApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../views/home.html',
            controller: 'mapCtrl',
            access: { requiredAuthentication: false }
        })
        .when('/parques', {
            templateUrl: '../views/parques.html',
            controller: 'mapCtrl',
            access: { requiredAuthentication: true }
        })
        .when('/eventos', {
            templateUrl: '../views/eventos.html',
            controller: 'parquesController',
            access: { requiredAuthentication: true }
        })
        .when('/registro', {
            templateUrl: '../views/registro.html',
            controller: 'registerController',
            access: { requiredAuthentication: false }
        })
        .when('/login', {
            templateUrl: '../views/login.html',
            controller: 'loginController',
            access: { requiredAuthentication: false }
        })
        .when('/gestion-users', {
            templateUrl: '../views/gestionUsuarios.html',
            controller: 'usersController',
            access: { requiredAuthentication: true }
        })
        .when('/gestion-parques', {
            templateUrl: '../views/gestionParques.html',
            controller: 'parksController',
            access: { requiredAuthentication: true }
        })
        .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.run(function($rootScope, $location, $window) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        var userlogged = window.sessionStorage.getItem("user");
        console.log(userlogged);
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication 
            && userlogged === null) {

            $location.path("/");
        }
    });
});

angularRoutingApp.controller('mainController', function ($scope) {
    $scope.message = 'Hola, Mundooooo!';
    $scope.welcome = true; //Escondemos el botón
    $scope.singup = true; //Escondemos el botón
    $scope.singup2 = true; //Escondemos el botón
    $scope.singin = true; //Escondemos el botón
    $scope.logOut = true; //Escondemos el botón

    ////Muestra nombre del usuario logeado y muestra-esconde botones///////////
    try {
        try {
            $scope.welcome = false; //Mostramos botón
            $scope.logOut = false; //Mostramos botón
            var userlogged = window.sessionStorage.getItem("user");
            $scope.usuariologeado = JSON.parse(userlogged);
            console.log("Bienvenido", $scope.usuariologeado.fullName);

        } catch (e) {
            $scope.welcome = true;
            $scope.logOut = true;
            $scope.singin = false;
            $scope.singup = false;
            $scope.singup2 = false;
            console.log("No estás logeado!", e);
            throw e;
        }
    } catch (e) {
    }
    /////////////////////////////////////////////////
    $scope.logout = function () {
        window.sessionStorage.removeItem("user");
        console.log("Ha salido correctamente.")
        window.location.reload();
        $location.path('/');
    }

});

angularRoutingApp.controller('loginController', function ($scope, $http, $location) {

    $scope.usuariologeado = {};

    $scope.loginFacebook = function () {
        $http.get('/api/auth/facebook/callback').success(function (data) {
            console.log('information data', data);
            $rootScope.authenticated = true;
            $location.path('/');
        })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.loginTwitter = function () {
        $http.get('/api/profile').success(function (data) {
            console.log('information data', data);
            $rootScope.authenticated = true;
            $location.path('#gestion-users');
        })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.localLogin = function () {

        var email = $scope.login.email;
        var pwd = $scope.login.pwd;
        var credentials = {
            email: email,
            password: pwd
        };
        $http.post('/api/login', credentials)
            .success(function (data) {
                console.log("User Logged", data);
                console.log(data);

                window.sessionStorage.setItem("user", JSON.stringify(data));
                var userlogged = window.sessionStorage.getItem("user");
                $scope.usuariologeado = JSON.parse(userlogged);
                console.log("Bienvenido", $scope.usuariologeado.fullName);

                window.location.reload();
                $location.path("/")
            })
            .error(function (data) {
                console.log(data);

            })
    }


});

angularRoutingApp.controller('mapCtrl', function ($scope, $http, $rootScope, geolocation, gservice) {
    /////////////////////////////////////////////////////////////////////////////////////////////////////Register Modal
<<<<<<< HEAD
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
    $scope.createUser = function () {
=======
    $scope.message = 'Formulario para añadir estudiantes';
    $scope.newUser = {};
    $scope.users = {};

    // Obtenemos todos los estudiantes
    $http.get('/api/user').success(function (data) {
        $scope.users = data;
    })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // Función para registrar estudiante
    $scope.createUserModal = function () {
>>>>>>> origin/master
        $http.post('/api/user', $scope.newUser)
            .success(function (data) {
                $scope.newUser = {}; // Borramos los datos del formulario
                $scope.users = data;
                $scope.pass2 = {};
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;
    $scope.hideform = true;

    $scope.$watch('newUser.password', function () { $scope.test(); });
    $scope.$watch('pass2', function () { $scope.test(); });
    $scope.$watch('fullName', function () { $scope.test(); });



    $scope.test = function () {
        if ($scope.newUser.password !== $scope.pass2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.newUser.fullName.length || !$scope.newUser.password.length || !$scope.pass2.length)) {
            $scope.incomplete = true;
        }
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////Fin register Modal


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////Login register Modal
    $scope.usuariologeado = {};

    $scope.loginFacebook = function () {
        $http.get('/api/auth/facebook/callback').success(function (data) {
                console.log('information data', data);
                $rootScope.authenticated = true;
                $location.path('/');
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.loginTwitter = function () {
        $http.get('/api/profile').success(function (data) {
                console.log('information data', data);
                $rootScope.authenticated = true;
                $location.path('#gestion-users');
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.localLogin = function () {

        var email = $scope.login.email;
        var pwd = $scope.login.pwd;
        var credentials = {
            email: email,
            password: pwd
        };
        $http.post('/api/login', credentials)
            .success(function(data){
                console.log("User Logged", data);
                console.log(data);

                window.localStorage.setItem("user", JSON.stringify(data));
                var userlogged = window.localStorage.getItem("user");
                $scope.usuariologeado = JSON.parse(userlogged);
                console.log("Bienvenido", $scope.usuariologeado.fullName);

                window.location.reload();
                $location.path("/")
            })
            .error(function(data){
                console.log(data);

            })
    };
    ////////////////////////////////////////////////////////////////////////////////////////Fin login modal

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
    $scope.items = [];
    $scope.addFacilitie = function () {
        $scope.items.push($scope.input);
        $scope.input = '';
        $scope.formData.facilities = $scope.items;
        console.log("Instalaciones del parque: ", $scope.formData.facilities)
    };



    // Initial Coordinates set
    // ...

    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function (data) {

        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = { lat: data.coords.latitude, long: data.coords.longitude };

        // Display coordinates in location textboxes rounded to three decimal points
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

        // Display message confirming that the coordinates verified.
        $scope.formData.htmlverified = "Ubicación verificada correctamente";
        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
        console.log($scope.formData.htmlverified, $scope.formData.latitude, $scope.formData.longitude);

    });

    // Functions
    // ----------------------------------------------------------------------------
    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function () {

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function () {
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "Danos permiso para determinar tu ubicación";
            console.log($scope.formData.htmlverified);
        });
    });

    // Creates a new Sandpit based on the form fields
    $scope.createSandpit = function (req) {
        // Grabs all of the text box fields
        var sandpitData = {
            name: $scope.formData.name,
            description: $scope.formData.description,
            price: $scope.formData.price,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified,
            facilities: $scope.formData.facilities
            //TODO: add creators email to the request
            //creator: req.email
        };
        console.log(req);
        // Saves the user data to the db
        $http.post('/api/sandpit', sandpitData)
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

angularRoutingApp.controller('eventosController', function ($scope) {
    $scope.message = 'Esta es la página de eventos';
});

angularRoutingApp.controller('parquesController', function ($scope) {
    $scope.message = 'Esta es la página de parques';

});

angularRoutingApp.controller('registerController', function ($scope, $http) {
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
    $scope.createUser = function () {
        $http.post('/api/user', $scope.newUser)
            .success(function (data) {
                $scope.newUser = {}; // Borramos los datos del formulario
                $scope.users = data;
                $scope.pass2 = {};
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;
    $scope.hideform = true;

    $scope.$watch('newUser.password', function () { $scope.test(); });
    $scope.$watch('pass2', function () { $scope.test(); });
    $scope.$watch('fullName', function () { $scope.test(); });



    $scope.test = function () {
        if ($scope.newUser.password !== $scope.pass2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.newUser.fullName.length || !$scope.newUser.password.length || !$scope.pass2.length)) {
            $scope.incomplete = true;
        }
    };
});

angularRoutingApp.controller('usersController', function ($scope, $http) {
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
    $scope.UserTaket = {};

    // Obtenemos todos los datos de la base de datos
    $http.get('/api/user').success(function (data) {
        $scope.users = data;
    })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // Función para registrar un user
    $scope.createUser = function () {
        $http.post('/api/user', $scope.newUser)
            .success(function (data) {
                $scope.newUser = {}; // Borramos los datos del formulario
                $scope.users = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función que borra un objeto user conocido su id
    $scope.deleteUser = function () {
        $http.delete('/api/user/' + $scope.UserTaket._id)
            .success(function (data) {
                $scope.newUSER = {};
                $scope.users = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };


    // Función para coger el usuario antes de ejecutar el Mensaje de advertencia modal
    $scope.takeUser = function (user) {
        $scope.UserTaket = user;
        console.log(user);
        console.log($scope.UserTaket);
        $scope.selected = true;
        $scope.header = "Editar usuario";
        $scope.update = false;
        $scope.create = true;

        console.log($scope.UserTaket, $scope.selected);
    };


    // Función para poner el objeto en la tabla para editarlo
    $scope.selectUser = function () {
        $scope.newUser = $scope.UserTaket;
        console.log($scope.UserTaket);
        $scope.selected = true;
        $scope.header = "Editar usuario";
        $scope.update = false;
        $scope.create = true;

        console.log($scope.newUser, $scope.selected);
    };

    // Función para editar los datos de una persona
    $scope.editUser = function () {
        $http.put('/api/user/' + $scope.newUser._id, $scope.newUser)
            .success(function (data) {
                $scope.newUser = {}; // Borramos los datos del formulario
                $scope.users = data;
                $scope.selected = false;
                $scope.header = "Crear usuario";
                $scope.update = true;
                $scope.create = false;
            })
            .error(function (data) {
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

    $scope.$watch('newUser.password', function () { $scope.test(); });
    $scope.$watch('pass2', function () { $scope.test(); });
    $scope.$watch('fullName', function () { $scope.test(); });



    $scope.test = function () {
        if ($scope.newUser.password !== $scope.pass2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.newUser.fullName.length ||
            !$scope.newUser.password.length || !$scope.pass2.length)) {
            $scope.incomplete = true;
        }
    };
});

angularRoutingApp.controller('parksController', function ($scope, $http) {
    $scope.message = 'Controlador de parques';
    $scope.newSandpit = {}; //Limpiamos formulario de registro
    $scope.sandpits = {}; //Limpiamos tabla de usuarios
    $scope.selected = false;
    $scope.header = "Crear usuario"; //Mostramos "Crear usuario" en el panel derecho
    $scope.update = true; //Escondemos el botón update
    $scope.create = false; //Mostramos botñon create
    $scope.error = false;
    $scope.incomplete = false;
    $scope.edit = true;

    // Obtenemos todos los datos de la base de datos
    $http.get('/api/sandpit').success(function (data) {
        $scope.sandpits = data;
    })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // Función para registrar un user
    $scope.createUser = function () {
        $http.post('/api/user', $scope.newUser)
            .success(function (data) {
                $scope.newUser = {}; // Borramos los datos del formulario
                $scope.users = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función que borra un objeto conocido su id
    $scope.deleteSandpit = function (id) {
        $http.delete('/api/sandpit/' + id)
            .success(function (data) {
                $scope.sandpits = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };


    // Función para coger el objeto seleccionado en la tabla antes de editarlo
    $scope.selectSandpit = function (sandpit) {
        $scope.newSandpit = user;
        $scope.selected = true;
        $scope.header = "Editar Sandpit";
        $scope.update = false;
        $scope.create = true;

        console.log($scope.newSandpit, $scope.selected);
    };

    // Función para editar los datos de una persona
    $scope.editUser = function () {
        $http.put('/api/sandpit/' + $scope.newSandpit._id, $scope.newSandpit)
            .success(function (data) {
                $scope.newSandpit = {}; // Borramos los datos del formulario
                $scope.sandpits = data;
                $scope.selected = false;
                $scope.header = "Crear Sandpit";
                $scope.update = true;
                $scope.create = false;
            })
            .error(function (data) {
                $scope.header = "Crear Sandpit";
                $scope.update = true;
                $scope.create = false;
                console.log('Error: ' + data);
            });
    };

    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;
    $scope.hideform = true;

    $scope.$watch('newSandpit.password', function () { $scope.test(); });
    $scope.$watch('pass2', function () { $scope.test(); });
    $scope.$watch('fullName', function () { $scope.test(); });



    $scope.test = function () {
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.newSandpit.name.length ||
            !$scope.newSandpit.description.length || !$scope.price.length)) {
            $scope.incomplete = true;
        }
    };
});


