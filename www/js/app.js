// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'angular-advanced-searchbox', 'ionic-timepicker', 'ionic-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html",
        controller: 'MapCtrl'
      }
    }
  })
   .state('app.weather', {
    url: "/weather",
    views: {
      'menuContent': {
        templateUrl: "templates/weather.html",
        controller: 'WeatherCtrl'
      }
    }
  }) 

  .state('app.browse', {
    url: "/stop",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html",
        controller: 'PlaylistCtrl'
      }
    }
  })
    .state('app.playlists', {
      url: "/routes",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/routes/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.new_alert', {
    url: "/alarms/new",
    views: {
      'menuContent': {
        templateUrl: "templates/alarm_new.html",
        controller: 'PlayCtrl'
      }
    }
  })
  
  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html"
      }
    }
  })
  .state('app.tickets', {
    url: "/tickets",
    views: {
      'menuContent': {
        templateUrl: "templates/tickets.html"
      }
    }
  })
  .state('app.shares', {
    url: "/shares",
    views: {
      'menuContent': {
        templateUrl: "templates/shares.html"
      }
    }
  })
  .state('app.alarms', {
    url: "/alarms",
    views: {
      'menuContent': {
        templateUrl: "templates/alarms.html",
        controller: 'PlayCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/map');
});
