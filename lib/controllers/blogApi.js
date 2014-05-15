'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Blog  = mongoose.model('Blog'),
    Counter = mongoose.model('Counter'),
    _ = require('lodash');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

/**
 * Create blog post
 */
exports.create = function (req, res, next) {
  Counter.getNext('blog', function(urlId){
    var newBlog = new Blog(req.body);
    newBlog.urlId = urlId;
    newBlog.save(function(err) {
      if (err) {
        Counter.revertNext('blog');
        return res.json(400, err);
      }
      return res.json(newBlog);
    });
  }, function(err){
    return res.send(400);
  });

};

exports.edit = function (req, res, next) {
  Blog.findById(req.body._id, function(err, blog){
    _.extend(blog,req.body);
    blog.save(function(err) {
      if (err) return res.json(400, err);

      return res.json(req.body);
    });
  });
};


exports.find = function(req, res, next) {
  var urlId = req.params.id;
  if(urlId !== undefined) {
    return Blog.findOne({ urlId: urlId }, function (err, blogpost) {
      if (!err) {
        return res.json(blogpost);
      } else {
        return res.send(err);
      }
    });
  } else {
    var length = req.query.length ? req.query.length : 5;
    var page   = req.query.page ? req.query.page : 1;
    Blog.find().sort('-date').skip(length * (page - 1)).limit(length).exec(function (err, blogposts) {
      Blog.count().exec(function (err, count) {
        if (err) return res.json(400, err);
        return res.json({count: count, blogposts: blogposts});
      });
    });
  }

};

exports.del = function (req, res, next) {
  Blog.findByIdAndRemove(req.params.id, function(err){
    if (err) return res.json(400, err);
    res.send(200);
  });
};