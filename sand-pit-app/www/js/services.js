angular.module('starter.services', [])
  .service('AuthService', function($q, $http) {
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var email = '';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      email = token.split('.')[0];
      isAuthenticated = true;
      authToken = token;

      // Set the token as header for your requests!
      $http.defaults.headers.common['X-Auth-Token'] = token;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      email = '';
      isAuthenticated = false;
      $http.defaults.headers.common['X-Auth-Token'] = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    var login = function(email, pw) {
      return $q(function(resolve, reject) {
        // Make a request and receive your auth token from your server
        storeUserCredentials(email + '.yourServerToken');
      });
    };

    var logout = function() {
      destroyUserCredentials();
    };

    loadUserCredentials();

    return {
      login: login,
      logout: logout,
      isAuthenticated: function() {return isAuthenticated;},
      email: function() {return email;}
    };
})
  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
