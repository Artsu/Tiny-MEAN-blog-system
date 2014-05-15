Tiny MEAN blog system
=====================
Welcome to tiny MEAN blog system! It is a very small yet sturdy blog system that consists of full mean stack (<a href="http://www.mongodb.org/">Mongodb</a>, <a href="http://expressjs.com/">Express</a>, <a href="http://angularjs.org/">AngularJS</a> & <a href="http://nodejs.org/">NodeJS</a>). The system is mostly done for learning purposes, but feel free to use it in <a href="#license">any way you want</a>.

<a href="http://nivasalo.com/projects/tiny-mean-blog">See the project webpage</a>

Features
--------

The tiny MEAN blog system can do all this and more:
* Login using <a href="http://passportjs.org/">passport</a>
* Add and edit new blog postsc
* Delete blog posts
* Automatic listing and pagination for blog posts
* Embedded <a href="http://ckeditor.com/">ckeditor</a> for both content and ingress
* Dynamically created breadcrumb
* AngularJS frontend
* Node.js & Express backend
* MongoDB as database solution

Installation
------------

To install the blog system follow these easy steps:
        
* Download the package from GitHub <code>git clone https://github.com/Artsu/Tiny-MEAN-blog-system.git mean-blog</code>
* Run <code>npm install</code> and <code>bower install</code> commands (must have npm and bower installed)
* Install and run <code>./mongod</code>
* Run one of the following commands
  * <code>grunt serve</code> launches the node-express server with test data so you can start trying it out. Includes watch and livereload plugins.
  * <code>grunt serve:dist</code> once you are done with your editing, run this command before going live and make sure everything works. This does the same as grunt serve but it build the dist package first and doesn't use watch or livereload.
  * <code>grunt</code> runs all the tests included in the project and builds the dist package which you can then dump to your production environment.
* Use /login page to login/create user. In production environment you should create your user and then edit routes.js so that <code>app.post('/api/users', users.create);</code> becomes <code>app.post('/api/users', middleware.auth, users.create);</code>. This makes it sure that no further users can create their accounts as there are no separate administrator roles included in the system.
        
And basically that's it! For production environment you probably want to have some more software installed on the server such as apache/nginx, and forever to run the Node server as a background process that can start itself in case something bad happens.
In production environment remember to have <code>NODE_ENV</code> environment variable set to 'production'.

Technologies
------------
There are number of amazing technologies included in this project. Here are listed some of these technologies.

####Frontend:
* AngularJS
* Angular-UI
* CKeditor
* Twitter Bootstrap Sass
* Testing:
  * Karma
  * Jasmine
  * ngHtml2JsPreprocessor

####Backend:
* Node.js
* Express
* MongoDB
* Passport
* Testing
  * Mocha
  * Supertest

####Build process:
* Grunt
* Originated from Yeoman <a href="">generator-angular-fullstack</a>

TODO
----
Some features are still under development and will be released later on. These include such as:
* Validation messages
* Tags
* Image uploader
* Hiding blog posts
* Versioning
 
Maybe at some point (no promises):
* Creating pages with static content

<a name="license"></a>License
----

Copyright (c) 2014 Ari-Matti Nivasalo

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.