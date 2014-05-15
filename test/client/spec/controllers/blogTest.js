'use strict';

describe('Controller: BlogCtrl', function () {

  // load the controller's module
  beforeEach(module('homepageApp'));

  var BlogCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/blog/')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    scope = $rootScope.$new();
    BlogCtrl = $controller('BlogCtrl', {
      $scope: scope,
      $window: window
    });
  }));

});

describe('Controller: BlogSingleCtrl', function () {

  // load the controller's module
  beforeEach(module('homepageApp'));


  var BlogSingleCtrl,
    scope,
    $httpBackend,
    routeParams = {blogID: 1};

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/blog/1')
      .respond({
        title: 'HTML5 Boilerplate',
        urlId: 1
      });
    scope = $rootScope.$new();
    BlogSingleCtrl = $controller('BlogSingleCtrl', {
      $scope: scope,
      $window: window,
      $routeParams: routeParams
    });
  }));

  it('should get blog post by url id', function () {
    $httpBackend.flush();
    expect(scope.blogPost.title).toBe('HTML5 Boilerplate');
  });
});


describe('Controller: BlogEditCtrl (edit)', function () {

  // load the controller's module
  beforeEach(module('homepageApp'));

  var BlogEditCtrl,
    scope,
    $httpBackend,
    routeParams = {blogID: 1};

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/blog/1')
      .respond({
        title: 'HTML5 Boilerplate',
        urlId: 1
      });
    scope = $rootScope.$new();
    BlogEditCtrl = $controller('BlogEditCtrl', {
      $scope: scope,
      $window: window,
      $routeParams: routeParams
    });
  }));

  it('should get blog post by url id', function () {
    $httpBackend.flush();
    expect(scope.blogPost.title).toBe('HTML5 Boilerplate');
  });
});


describe('Controller: BlogEditCtrl (create)', function () {

  // load the controller's module
  beforeEach(module('homepageApp'));

  var BlogEditCtrl,
    scope,
    $httpBackend,
    routeParams = {blogID: 1};

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/blog/1')
      .respond(undefined);
    scope = $rootScope.$new();
    BlogEditCtrl = $controller('BlogEditCtrl', {
      $scope: scope,
      $window: window,
      $routeParams: routeParams
    });
  }));

  it('should get blog post by url id', function () {
    $httpBackend.flush();
    expect(angular.isUndefined(scope.blogPost.title)).toBe(true);
  });
});




