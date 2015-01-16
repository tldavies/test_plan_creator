/**
 * A simple example of how to use Waterline v0.10 with Express
 */

var express = require('express'),
    _ = require('lodash'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Waterline = require('waterline');

var adapter = require('sails-disk');

// Instantiate a new instance of the ORM
var orm = new Waterline();

// Setup Express Application
app.use(bodyParser());
app.use(methodOverride());
 
// Set Adapter Config
// Merges the default values with any overrides.
adapter.config = _.merge({}, adapter.defaults);
 
// Namespaced Models Object, holds instantiated Waterline Collections
app.models = {};
 
// Build Express Routes (CRUD routes for /users)
 
app.get('/users', function(req, res) {
  app.models.user.find().done(function(err, models) {
    if(err) return res.json({ err: err }, 500);
    res.json(models);
  });
});
 
app.post('/users', function(req, res) {
  app.models.user.create(req.body, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});
 
app.get('/users/:id', function(req, res) {
  app.models.user.findOne({ id: req.params.id }, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});
 
app.del('/users/:id', function(req, res) {
  app.models.user.destroy({ id: req.params.id }, function(err) {
    if(err) return res.json({ err: err }, 500);
    res.json({ status: 'ok' });
  });
});
 
app.put('/users/:id', function(req, res) {
  // Don't pass ID to update
  delete req.body.id;
 
  app.models.user.update({ id: req.params.id }, req.body, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});
 
// Build A Model
var User = Waterline.Collection.extend({
  adapter: 'disk',
  tableName: 'users',
 
  attributes: {
    first_name: 'string',
    last_name: 'string'
  }
});
 
// Load the Model into the ORM
orm.loadCollection(User);
 
// Start Waterline passing adapters in
orm.initialize({ adapters: { disk: adapter }}, function(err, collections) {
  app.models.user = collections.users;
 
  // Start Server
  app.listen(3000);
});
