'use strict';

angular.module('homepageServices')
  .factory('Blog', function ($resource) {
    return $resource('/api/blog/:id', {
      id: '@urlId'
    }, {
      query: {
        isArray: false //due to returning also count and not just a list of blog posts
      }
    });
  });
