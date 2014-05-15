'use strict';

angular.module('homepageFilters', []).
    filter('emailFormatter', function() {
        return function(email) {
            return email.username + '@' + email.domain;
          };
      }).
    filter('urlParser', function() {
      return function(name) {
        var url = name.toLowerCase().
          replace(/ ([^a-zA-Z0-9]) /g, '-').
          replace(/ /g, '-').
          replace(/\'/g, '');
        return url;
      };
    });