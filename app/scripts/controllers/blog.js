'use strict';

angular.module('homepageControllers')
  .controller('BlogCtrl', function ($scope, $location, $routeParams, $sce, Blog, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.blogPosts = [];
    $scope.currentPage = $routeParams.page ? $routeParams.page : 1;
    var length = 5;
    $scope.firstRun = false;

    $scope.pages = {
      maxSize: 5,
      itemsPerPage: length,
      boundaryLinks: true,
      rotate: false
    };

    $scope.$watch('currentPage', function() {
      if ($routeParams.page !== $scope.currentPage && $scope.firstRun) {
        $location.path($location.path()).search('page', $scope.currentPage);
      }
    });

    Blog.query({ page: $scope.currentPage, length: length }, function(response) {
      $scope.pages.bigTotalItems = response.count;

      /*
       * Must be set again here because angular bootstrap is watching bitTotalItems and resets currentPage
       * each time. These problems are due to wanting to use url parameters for current page.
       */
      if ($routeParams.page) {
        $scope.currentPage = $routeParams.page;
      } else {
        $scope.currentPage = 1;
      }

      angular.forEach(response.blogposts, function(blogPost) {
        blogPost.ingress = $sce.trustAsHtml(blogPost.ingress);
        $scope.blogPosts.push(blogPost);
      });
      $scope.firstRun = true;
    });
  }).controller('BlogSingleCtrl', function ($scope, $rootScope, $routeParams, $sce, Blog) {
    $scope.blogPost = Blog.get({id: $routeParams.blogID}, function() {
      $rootScope.articleTitle = $scope.blogPost.title;
      $scope.blogPost.body = $sce.trustAsHtml($scope.blogPost.body);
    });
  }).controller('BlogEditCtrl', function ($rootScope, $scope, $window, $routeParams, $location, Blog) {
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.dateOpened = true;
    };

    $scope.ingressEditorOptions = {
      language: 'en',
      height: '160'
    };
    $scope.contentEditorOptions = {
      language: 'en'
    };

    $scope.blogPost = {};
    $scope.blogPost.date = Date.now();
    if ($rootScope.currentUser) {    //For debugging purposes when using edit without logging in
      $scope.blogPost.author = $rootScope.currentUser.name;
    }
    if($routeParams.blogID !== undefined) {
      $scope.blogPost = Blog.get({id: $routeParams.blogID}, function() {
        $rootScope.articleTitle = $scope.blogPost.title;
      });
    }

    $scope.saveBlogPost = function() {
      if ($window.confirm('Are you sure you want to save this blog post?')) {
        $scope.blogPost = Blog.save($scope.blogPost, function () {
          $location.path('/blog');
        }, function (errorMessages) {
          $scope.errors = errorMessages.data.errors;
        });
      }
    };

  });

