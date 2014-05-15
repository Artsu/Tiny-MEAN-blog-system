'use strict';

angular.module('homepageDirectives')
  .controller('BlogAdminPanel', function($rootScope, $scope, $window, $location, Auth, Blog) {
  $scope.isLoggedIn = Auth.isLoggedIn();
  $scope.deleteBlogPost = function() {
    if ($window.confirm('Are you sure you want to delete this blog post?')) {
      $scope.blogPost = Blog.delete({id: $scope.blogPost._id}, function() {
        $rootScope.successMessage = 'Blogpost removed successfully';
        $rootScope.returnPath = '/blog';
        $location.path('/success');
      }, function(){
        $scope.deleteError = true;
      });
    }
  };
}).directive('fpBlogAdminPanel', function () {
    return {
        controller: 'BlogAdminPanel',
        templateUrl: 'partials/directives/blogadminpanel'
      };
  });
