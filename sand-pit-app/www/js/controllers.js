var BASE_URL = "http://localhost:5000";

//var BASE_URL = "http://147.83.7.155:5000";


angular.module('starter.controllers', [])

  .run(function ($rootScope, $location, $window) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
      var userlogged = window.sessionStorage.getItem("user");
      var user = JSON.parse(userlogged);
      console.log(user);
      if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication !== false
        && userlogged === null) {
        $state.go('login');
      }else{
        $state.go('tab.mapa');
      }
    });
  })

  .controller('AppCtrl', function($scope, $state) {
    $scope.logout = function () {
      window.sessionStorage.removeItem("user");
      $scope.userlogged = null;
      $http.get(BASE_URL + "/api/logout");
      console.log("Ha salido correctamente.");
      $state.go('login', {}, {reload: true});
    };

  })

  .controller('LoginCtrl', function($scope,$state, $ionicPopup, AuthService, $http, $rootScope) {
    $scope.data = {};
    $scope.usuariologeado = {};
    $scope.base_url = BASE_URL + "/auth/facebook";

    $scope.loginFacebook = function () {
      $http.get(BASE_URL + '/auth/facebook/callback').success(function (data) {
          console.log('information data', data);
          $rootScope.authenticated = true;
          $state.go('tab.mapa', {}, {reload: true});

          checkIfUserLoggedInBackEnd();

        })
        .error(function (data) {
          console.log('Error: ' + data);
        });
    };

    function checkIfUserLoggedInBackEnd() {
      $http.get(BASE_URL + "/api/getUser")
        .success(function (data) {
          var tmp = window.sessionStorage.getItem("user");
          if (data) {
            if (!tmp) {
              window.sessionStorage.setItem("user", JSON.stringify(data));
            }
            return;
          }
          window.sessionStorage.removeItem("user");
          console.log("No user logged.");
          $state.go('login', {}, {reload: true});
        })
        .error(function (data) {
          console.log("No user logged.");
          window.sessionStorage.removeItem("user");
          $state.go('login', {}, {reload: true});
        })
    }

    $scope.login = function (data) {
      console.log('esto hay en data', data);

      $http.post(BASE_URL + '/api/login', data).success(function (data) {
          console.log("User Logged", data);
          window.sessionStorage.setItem("user", JSON.stringify(data));
          $scope.usuariologeado = data;
          $state.go('tab.mapa', {}, {reload: true});
        })
        .error(function (data) {
          console.log('Error: ' + data);
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        });
    };

    $scope.signUp = function () {
      $scope.newUser = {};
      var addPopup = $ionicPopup.confirm({
        title: 'Create new student',
        template: '<input type="text" placeholder="Username" ng-model="newUser.fullName"> <br> <input type="text" placeholder="Email" ng-model="newUser.email"> <br> <input type="password" placeholder="Password" ng-model="newUser.pass"> <br> <input type="password" placeholder="Repyte password" ng-model="newUser.pass2">',
        scope: $scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Add</b>',
            type: 'button-positive',
            onTap: function () {
              if ($scope.newUser.pass == $scope.newUser.pass2) {
                console.log('user', $scope.newUser);
                var postUser = {
                  fullName : $scope.newUser.fullName,
                  email : $scope.newUser.email,
                  password : $scope.newUser.pass
                };
                $http.post(BASE_URL + '/api/user', postUser)
                  .success(function (data) {
                    $scope.newUser = data;
                    console.log('User has added correctly');
                    loginAfterRegister(postUser);
                  })
                  .error(function (data) {
                    console.log('Error: ' + data);
                    var alertPopup = $ionicPopup.alert({
                      title: 'This email is already in used!'
                    });
                    $timeout(function () {
                      alertPopup.close(); //close the popup after 3 seconds for some reason
                    }, 3000);
                  });
              } else {
                var alertPopup = $ionicPopup.alert({
                  title: 'Please repeat the password!'
                });
                $timeout(function () {
                  alertPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
              }
            }
          }
        ]
      });
    };

    function loginAfterRegister(credentials) {
      console.log('esto hay en data', credentials);

      var userLog = {
        email : credentials.email,
        password : credentials.password
      };

      $http.post(BASE_URL + '/api/login', userLog).success(function (data) {
          console.log("User Logged", data);
          window.sessionStorage.setItem("user", JSON.stringify(data));
          $scope.usuariologeado = data;
          $state.go('tab.mapa', {}, {reload: true});
        })
        .error(function (data) {
          console.log('Error: ' + data);
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        });
    }
  })

.controller('MapaCtrl', function($scope, $ionicLoading, $ionicPopup, $compile, $state, $http) {
  function initialize() {

    $ionicLoading.show({
      template: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      var mylatlong = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

      var mapOptions = {
        center: mylatlong,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

      $scope.map = map;

      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: mylatlong
      });

      var infoWindow = new google.maps.InfoWindow({
        content: "Estas aquí!"
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open($scope.map, marker);
      });

      var centerControlDiv = document.createElement('div');
      var centerControl = new CenterControl(centerControlDiv, map);

      var addDiv = document.createElement('div');
      var add = new AddSandpit(addDiv, map);

      //centerControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(addDiv);
      map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(centerControlDiv);

      var locations = [];

      $http.get(BASE_URL + '/api/sandpit').success(function(response) {

        // Loop through all of the JSON entries provided in the response
        for (var i = 0; i < response.length; i++) {
          var sandpit = response[i];

          // Create popup windows for each record
          var contentString =
            '<p><b>Nombre</b>: ' + sandpit.name +
            '<br><b>Precio</b>: ' + sandpit.price +
            '<br><b>Descripcion</b>: ' + sandpit.description +
            '<br><b>Instalaciones</b>: ' + sandpit.facilities +
            '</p>';

          var sandpitlatlong = new google.maps.LatLng(sandpit.location[0], sandpit.location[1]);
          // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
          var sandpitMarker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: sandpitlatlong
          });

          var infoSandpit = new google.maps.InfoWindow({
            content: contentString
          });

          google.maps.event.addListener(sandpitMarker, 'click', function () {
            infoSandpit.open($scope.map, sandpitMarker);
          });
        }
      }).error(function(){});
      $ionicLoading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);
  ionic.Platform.ready(initialize);

  function CenterControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = '<a ng-click="centerOnMe()" class="button button-icon icon ion-navigate">Find Me</a>';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
      if (!$scope.map) {
        return;
      }

      $ionicLoading.show({
        template: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function (pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        var mylatlong = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        map.setCenter(mylatlong);
        $ionicLoading.hide();
      }, function (error) {
        alert('Unable to get location: ' + error.message);
      });
    });

  }

  function AddSandpit(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = '<a class="button icon ion-android-add-circle"></a>';
    controlUI.appendChild(controlText);

    controlUI.addEventListener('click', function() {
      $scope.newSandpit = {};
      var user = JSON.parse(window.sessionStorage.getItem("user"));
      console.log('user', user);
      var addPopup = $ionicPopup.confirm({
        title: 'Create new student',
        template: '<input type="text" placeholder="SnadPit name" ng-model="newSandpit.name"> <br> <input type="text" placeholder="Description" ng-model="newSandpit.description"> <br> <input type="text" placeholder="Price €" ng-model="newSandpit.price">',
        scope: $scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Add</b>',
            type: 'button-positive',
            onTap: function () {
              navigator.geolocation.getCurrentPosition(function (pos) {
                var sandpitData = {
                  name: $scope.newSandpit.name,
                  description: $scope.newSandpit.description,
                  price: $scope.newSandpit.price,
                  location: [pos.coords.latitude, pos.coords.longitude],
                  creator: user.email
                };

                $http.post(BASE_URL + '/api/sandpit', sandpitData)
                  .success(function (data) {
                    $scope.newUser = data;
                    console.log('Sandpit has added correctly');
                  })
                  .error(function (data) {
                    console.log('Error: ' + data);
                    var alertPopup = $ionicPopup.alert({
                      title: 'This email is already in used!'
                    });
                    $timeout(function () {
                      alertPopup.close(); //close the popup after 3 seconds for some reason
                    }, 3000);
                  });
              }, function (error) {
                alert('Unable to get location: ' + error.message);
              });
            }
          }
        ]
      });
    })
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
