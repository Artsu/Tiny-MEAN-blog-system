'use strict';

angular.module('homepageApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
