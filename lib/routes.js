'use strict';

var blog = require('./controllers/blogApi'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
//  app.get('/api/auth/*', middleware.auth);
//  app.post('/api/auth/*', middleware.auth);

  app.get('/api/awesomeThings', blog.awesomeThings);

  app.get('/api/blog', blog.find);
  app.get('/api/blog/:id?', blog.find);
  app.post('/api/blog', middleware.auth, blog.create);          //
  app.post('/api/blog/:id', middleware.auth, blog.edit);
  app.delete('/api/blog/:id?', middleware.auth, blog.del);
  
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};