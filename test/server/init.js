module.exports = { mockPassportLogin: function () {
  var http = require('http')
    , req = http.IncomingMessage.prototype;

  req.isAuthenticated = function() {
    return true;
  };

}};