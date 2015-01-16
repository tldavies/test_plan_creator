/**
 * Created by Tracy on 1/15/15.
 */
/**
 * A simple example of how to use Waterline v0.10 with Express
 */

var express = require('express'),
    _ = require('lodash'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Waterline = require('waterline');



// Instantiate a new instance of the ORM
var orm = new Waterline();


//////////////////////////////////////////////////////////////////
// WATERLINE CONFIG
//////////////////////////////////////////////////////////////////

// Require any waterline compatible adapters here
var mongoAdapter = require('sails-mongo');


// Build A Config Object
var config = {
    // Setup Adapters
    // Creates named adapters that have have been required
    adapters: {
        'default': 'mongo',
        mongo: require('sails-mongo')
    },

    // Build Connections Config
    // Setup connections using the named adapter configs
    connections: {
        'default': {
            adapter: 'mongo',
            url: 'mongodb://localhost:27017/unparse'
        }
    }
};


//////////////////////////////////////////////////////////////////
// WATERLINE MODELS
//////////////////////////////////////////////////////////////////

var User = Waterline.Collection.extend({
    identity: 'user',
    connection: 'default',

    attributes: {
        first_name: 'string',
        last_name: 'string'
    }
});




// Load the Models into the ORM
orm.loadCollection(User);



//////////////////////////////////////////////////////////////////
// EXPRESS SETUP
//////////////////////////////////////////////////////////////////


// Setup Express Application
app.use(bodyParser.json());
app.use(methodOverride());

mongoAdapter.host = 'localhost';
mongoAdapter.schema = true;
mongoAdapter.database = 'waterline-mongo';

app.models = {};


// Build Express Routes (CRUD routes for /users)
app.get('/users', function(req, res) {
    app.models.user.find().done(function(err, models) {
        if(err) return res.json({ err: err }, 500);
        res.json(models);
    });
});

app.post('/users', function(req, res) {
    console.log(req.body);
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


app.put('/users/:id', function(req, res) {
    // Don't pass ID to update
    delete req.body.id;

    app.models.user.update({ id: req.params.id }, req.body, function(err, model) {
        if(err) return res.json({ err: err }, 500);
        res.json(model);
    });
});



//////////////////////////////////////////////////////////////////
// START WATERLINE
//////////////////////////////////////////////////////////////////

// Start Waterline passing adapters in
orm.initialize(config, function(err, data) {
    if (err) {
        throw err;
    }

    app.models = data.collections;
    app.connections = data.connections;

    app.listen(3000);
});

