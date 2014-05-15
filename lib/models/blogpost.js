'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var BlogSchema = new Schema({
  urlId: { type: Number, index: { unique: true }},
  title: { type: String, required: true },
  author: String,
  ingress: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean
});

/**
 * Validations
 */
//BlogSchema.path('name').validate(function (num) {
//  return num >= 1 && num <= 10;
//}, 'Awesomeness must be between 1 and 10');

mongoose.model('Blog', BlogSchema);