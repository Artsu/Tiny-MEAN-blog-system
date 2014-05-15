'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Thing = mongoose.model('Thing'),
  Blog = mongoose.model('Blog'),
  Counter = mongoose.model('Counter');

var initializeData = {

  initializeBlogPosts: function (callback) {
    Blog.find({}).remove(function() {
      Blog.create([{
          urlId : 1,
          title : 'Blogpost 1 - AngularJS',
          body : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
          ingress : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id ligula nec orci faucibus iaculis. Phasellus viverra, quam eget tincidunt mollis, sem dolor volutpat orci, laoreet tristique elit eros at nisi. Phasellus condimentum turpis dignissim cursus egestas. Duis fermentum ipsum ac euismod suscipit.',
          date : new Date('Wed May 12 2014')
        }, {
          urlId : 2,
          title : 'Blogpost 2 - MongoDB + Mongoose',
          body : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
          ingress : 'Cras id iaculis dui, eget dictum justo. Vivamus ligula magna, sodales volutpat posuere non, suscipit sed ipsum. Suspendisse vel cursus ligula, at fermentum purus. Aenean mauris magna, consequat vel volutpat sit amet, gravida at justo. In pulvinar urna eu accumsan iaculis.',
          date : new Date('Wed May 15 2014')
        }, {
          urlId : 3,
          title : 'Blogpost 3 - Yeoman + Mongoose',
          body : 'Combined with Mongoose to simplify adding validation and business logic. An excellent document database.',
          ingress : 'Vivamus ligula magna, sodales volutpat posuere non, suscipit sed ipsum. Suspendisse vel cursus ligula, at fermentum purus. Cras id iaculis dui, eget dictum justo. Aenean mauris magna, consequat vel volutpat sit amet, gravida at justo. In pulvinar urna eu accumsan iaculis.',
          date : new Date('Wed May 14 2008')
        }], function() {
          console.log('finished populating blogposts');
          if (callback) {callback();}
        }
      );
    });
  },

  initializeCounter: function (callback) {
    Counter.find({}).remove(function () {
      Counter.create({
          _id: 'blog',
          sequence: 3
        }, function () {
          console.log('finished populating counter');
          if (callback) {callback();}
        }
      );
    });
  },

  initializeUser: function (callback) {
    // Clear old users, then add a default user
    User.find({}).remove(function() {
      User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@test.com',
          password: 'test'
        }, function() {
          console.log('finished populating users');
          if (callback) {callback();}
        }
      );
    });
  },


  /**
   * Populate database with sample application data
   */
  initializeAllTestData: function () {

    this.initializeBlogPosts();
    this.initializeCounter();
    this.initializeUser();

  }

};

exports = module.exports = initializeData;
