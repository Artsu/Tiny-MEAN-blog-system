'use strict';

angular.module('homepageServices', []);
angular.module('homepageControllers', ['homepageServices']);
angular.module('homepageDirectives', []);

angular.module('homepageApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',

  'homepageControllers',
  'homepageDirectives',
  'homepageFilters',
  'homepageServices',

  //Vendor
  'ui.bootstrap',
  'ngCkeditor'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl',
        label: 'Home',
        pageTitle: 'Yoursite - xxxxxxxxx'
      }).
      // Must be defined before blog single ctrl or the url will match the wrong routing first
      when('/blog/edit/:blogID?', {
        templateUrl: 'partials/blogedit',
        controller: 'BlogEditCtrl',
        label: 'Edit blog post'
      }).
      when('/blog/:blogID/:articleName', {
        templateUrl: 'partials/blogsingle',
        controller: 'BlogSingleCtrl',
        pageTitle: 'blogpost'
      }).
      when('/blog', {
        templateUrl: 'partials/blog',
        controller: 'BlogCtrl',
        label: 'Blog',
        pageTitle: 'Yoursite - Blog - xxxxxxxxx'
      }).
      when('/success', {
        templateUrl: 'partials/success',
        controller: 'SuccessCtrl',
        label: 'Success'
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl',
        label: 'Login'
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        label: 'Settings'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl',
        label: 'Signup'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, $window, Auth) {

    $rootScope.$on('$routeChangeStart', function ($routeParams, $anchorScroll, event, next) {
      $window._gaq.push(['_trackPageview', $location.path()]);
      //I use nginx for serving static content. This ensures that requests for such content doesn't end up in express.
      if ($location.path().indexOf('/static') === 0) {
        event.preventDefault();
        $window.location = $location.path();
      }

      // Redirect to login if route requires auth and you're not logged in
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }

      // Update title to match that of the pages custom pageTitle. Blogposts got custom logic.
      $rootScope.pageTitle = next.pageTitle ? next.pageTitle : 'Yoursite - xxxxxxx';
      if (next.pageTitle === 'blogpost') {
        $rootScope.$watch('articleTitle', function(){
          $rootScope.pageTitle = 'Yoursite - Blog - ' + $rootScope.articleTitle;
        });
      }
    });

    $rootScope.isActive = function(route) {
      if (route === '/') {
        return route === $location.path();
      }
      return $location.path().indexOf(route) === 0;
    };
  });
