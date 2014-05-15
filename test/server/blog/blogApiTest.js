'use strict';

var should = require('should'), //assert and should do essentially the same thing but in a different way
    assert = require('assert'), //they are both included here for science
    app = require('../../../server'),
    request = require('supertest'),
    helper = require('../init'),
    initializeTestData = require('../../../lib/config/dummydata');

describe('Load test data', function() {
  it('should initialize blog posts', function(done) {
    initializeTestData.initializeBlogPosts(done());
  });

  it('should initialize counter', function(done) {
    initializeTestData.initializeCounter(done());
  });

  it('should initialize user', function(done) {
    initializeTestData.initializeUser(done());
  });
});

describe('GET /api/blog/', function() {

  it('should respond with count and list of all blog posts', function(done) {
    request(app)
      .get('/api/blog/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.count.should.be.exactly(3);
        res.body.blogposts.length.should.be.exactly(3);
        res.body.blogposts.should.be.instanceof(Array);
        res.body.blogposts[0].title.should.be.exactly('Blogpost 2 - MongoDB + Mongoose');
        done();
      });
  });

  it('should respond with count and list blog posts from page 2 with page size 2 items', function(done) {
    request(app)
      .get('/api/blog/')
      .query({length:2 })
      .query({ page: 2 })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.count.should.be.exactly(3);
        res.body.blogposts.length.should.be.exactly(1);
        res.body.blogposts.should.be.instanceof(Array);
        res.body.blogposts[0].title.should.be.exactly('Blogpost 3 - Yeoman + Mongoose');
        done();
      });
  });

});

describe('GET /api/blog/:id', function() {

  var urlId = 1;

  it('should respond with single blog post', function(done) {
    request(app)
      .get('/api/blog/' + urlId)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.body.title, 'Blogpost 1 - AngularJS');
        done();
      });
  });
});

var postData = {
  title: 'Testblog',
  body: 'Test body longer than name'
};

describe('GET /api/blog/:id? while not logged in', function() {

  it('should respond error 401 unauthorized', function(done) {
    request(app)
      .post('/api/blog/thisisid')
      .send(postData)
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/blog while logged in', function() {

  beforeEach(function (done) {
    helper.mockPassportLogin();
    done();
  });

  it('should respond with JSON array of the created blog post', function(done) {
    request(app)
      .post('/api/blog/')
      .send(postData)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.body.body, 'Test body longer than name');

        done();
      });
  });
});

describe('DELETE /api/blog/:id', function() {

  beforeEach(function (done) {
    helper.mockPassportLogin();
    done();
  });

  it('should respond with JSON array of the created blog post', function(done) {
    request(app)
      .post('/api/blog/')
      .send(postData)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        request(app)
          .del('/api/blog/' + res.body._id)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            assert.ok(true); //No errors
          });

        done();
      });
  });
});