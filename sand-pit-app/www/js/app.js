// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.constants'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.mapa', {
    url: '/mapa',
    views: {
      'mapa': {
        templateUrl: 'templates/mapa.html',
        controller: 'MapaCtrl'
      }
    }
  })

  .state('tab.myevents', {
      url: '/myevents',
      views: {
        'tab-myevents': {
          templateUrl: 'templates/tab-myevents.html',
          controller: 'MyEventsCtrl'
        }
      }
    })
    .state('tab.sandpit-detail', {
      url: '/sandpit/:sandpitId',
      views: {
        'tab-sandpit': {
          templateUrl: 'templates/sandpit-detail.html',
          controller: 'SandpitDetailCtrl'
        }
      }
    })
    .state('tab.event-detail', {
      url: '/event-detail',
      views: {
        'tab-chats': {
          templateUrl: 'templates/event-detail.html',
          controller: 'EventDetailCtrl'
        },
      params: {
          eventInfo : null
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/mapa');
  $urlRouterProvider.otherwise('/login');

});
