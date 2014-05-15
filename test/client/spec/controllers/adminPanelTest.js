'use strict';

describe('Directive: fpBlogAdminPanel', function () {

  // load the controller's module
  beforeEach(module('homepageApp'));
  beforeEach(module('templates'));

  var $compile,
      $scope,
      $rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
  }));

  describe('while not logged in', function() {
    beforeEach(inject(function (Auth) {
      Auth.isLoggedIn = function() {return false;};
    }));

    it('should not be visible', function () {
      var element = $compile('<div fp-blog-admin-panel></div>')($scope);
      $scope.$digest();
      angular.element(document.body).html(element.html());

      expect(document.getElementsByClassName('blog-admin-top')[0].className.indexOf('ng-hide')).toBeGreaterThan(0);
    });
  });

  describe('while logged in', function() {
    beforeEach(inject(function (Auth) {
      Auth.isLoggedIn = function() {return true;};
    }));

    it('should be visible', function () {
      var element = $compile('<div fp-blog-admin-panel></div>')($scope);
      $scope.$digest();
      angular.element(document.body).html(element.html());

      expect(document.getElementsByClassName('blog-admin-top')[0].className.indexOf('ng-hide')).toBeLessThan(0);
    });

  });

  describe('when delete blog post link is clicked', function() {
    var clicked = false,
        $httpBackend;

    beforeEach(inject(function (_$httpBackend_, Auth, $window) {
      $scope.blogPost = {_id: 1};
      Auth.isLoggedIn = function() {return true;};
      $window.confirm = function() {
        clicked = true;
        return true;
      };
      $httpBackend = _$httpBackend_;
      $httpBackend.expectDELETE('/api/blog/1')
        .respond(200);
    }));

    it('should be visible', function () {
      var element = $compile('<div fp-blog-admin-panel></div>')($scope);
      $scope.$digest();
      angular.element(document.body).html(element.html());

      $scope.deleteBlogPost();
      $httpBackend.flush();
      expect(clicked).toBe(true);
      expect($rootScope.successMessage).toBe('Blogpost removed successfully');
    });

  });

});