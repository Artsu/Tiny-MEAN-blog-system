'use strict';

/**
 * Refactored from https://github.com/ianwalter/ng-breadcrumbs/.
 * Sadly this is pretty spagethy code as I needed lots of different rules for the likes of
 * blog post title etc.
 */
angular.module('homepageDirectives')
  .controller('BreadcrumbCtrl', function($scope, $rootScope, $location, $route) {
  $scope.$on('$routeChangeSuccess', function () { /* event, current, previous */
    $scope.showBlogPostTitle = $location.path().match(/\/blog\/[0-9]+\/.*/g);
    if ($location.path() !== '/') {
      $scope.breadcrumbs = [];
      var routes = $route.routes,
          paths = $location.path().split('/'),
          path = '';

      var getRoute = function(route) {
        if ($route.current) {
          var param;
          angular.forEach($route.current.params, function (value, key) {
            if (route.indexOf(value) !== -1) {
              param = value;
            }
            if (param) {
              route = route.replace(value, ':' + key);
            }
          });
          return { path: route, param: param };
        }
      };

      //if path ends with '/'

      var usedRoutes = []; //Used in getting rid of multiple instances of same page on breadcrumb, eg. /blog/id, /blog/id/2, /blog/id/2/blog-post-title
      paths.forEach(function(entry) {
        path += path === '/' ? entry : '/' + entry;
        var route = getRoute(path);

        var routeObj = routes[route.path + '?'] ? routes[route.path + '?'] : routes[route.path];
        if ((routeObj && usedRoutes.indexOf(routeObj.templateUrl) === -1)) {
          usedRoutes.push(routeObj.templateUrl);
          var label =  routeObj.label;
          var href = paths[paths.length-1] === entry ? null : path;
          $scope.breadcrumbs.push({
              name: label,
              route: href
            });
        }
      });

    } else {
      $scope.breadcrumbs = [{
          name: 'Home',
          route: '/'
        }];
    }
  });
}).directive('fpBreadcrumb', function () {
    return {
        controller: 'BreadcrumbCtrl',
        templateUrl: 'partials/directives/breadcrumb'
      };
  });
