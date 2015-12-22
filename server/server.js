// DEPENDENCIES
// ============
var express = require("express"),
    http = require("http"),
    port = (process.env.PORT || 8001),
    mongoose = require('mongoose'),
    server = module.exports = express();

// MONGODB CONFIGURATION
// ====================
mongoose.connect( 'mongodb://localhost:27017/managingapp' );
mongoose.connection.on('open', function() {
  console.log("Connected to Mongoose...");
});

//Schemas
var ItemSchema = new mongoose.Schema({
  gtin: Number,
  inventory_id: Number,
  name: String,
  description: String,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
  //checked: Boolean,
  //category: String,
  state: String
});

var ItemInstanceSchema = new mongoose.Schema({
  id: Number,
  gtin: Number,
  inventory_id: Number,
  //name: String,
  //description: String,
  order_id: Number,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
  //checked: Boolean,
  //category: String,
  state: String
});

//Models
var ItemModel = mongoose.model( 'Item', ItemSchema );
var ItemInstanceModel = mongoose.model( 'ItemInstance', ItemInstanceSchema );

// SERVER CONFIGURATION
// ====================
server.configure(function() {

  server.use(express["static"](__dirname + "/../public"));

  server.use(express.errorHandler({

    dumpExceptions: true,

    showStack: true

  }));

  server.use(express.bodyParser())

  server.use(server.router);

});

server.get( '/api/items', function( request, response ) {
  return ItemModel.find( function( err, items ) {
    if( !err ) {
      return response.send( items );
    } else {
      return console.log( err );
    }
  });
});

server.post( '/api/items', function( request, response ) {
  var item = new ItemModel({
    id: request.body.id,
    gtin: request.body.gtin,
    name: request.body.name
  });

  return item.save( function( err ) {
    if( !err ) {
      console.log( 'created' );
      return response.send( item );
    } else {
      console.log( err );
    }
  });
});

// SERVER
// ======

// Start Node.js Server
http.createServer(server).listen(port);

console.log('Welcome to Backbone-Require-Boilerplate!\n\nPlease go to http://localhost:' + port + ' to start using Require.js and Backbone.js');