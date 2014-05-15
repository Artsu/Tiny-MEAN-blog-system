'use strict';

/*
 * https://groups.google.com/forum/#!msg/mongoose-orm/_AajaY6heN4/cKN25E0FTKwJ
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CounterSchema = new Schema({
  _id: { type: String, required: true },
  sequence: { type: Number, required: true }
});

var Counter = mongoose.model('Counter', CounterSchema);

Counter.getNext = function(modelType, callback) {
  var query = {_id: modelType};
  var update = {$inc: {sequence: 1}};
  var options = {upsert: true};
  Counter.findOneAndUpdate(query, update, options, function(err, counter) {
    if (err) {
      console.log(JSON.stringify(err));
    }
    callback(counter.sequence);
  });
};

Counter.revertNext = function(modelType) {
  var query = {_id: modelType};
  var update = {$inc: {sequence: -1}};
  var options = {upsert: true};
  Counter.findOneAndUpdate(query, update, options, function(err, counter) {
//    if (err) {
//      console.log(JSON.stringify(err));
//    }
//    callback(counter.sequence);
  });
};