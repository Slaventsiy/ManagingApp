// DEPENDENCIES
// ============
var express = require("express"),
    http = require("http"),
    port = (process.env.PORT || 8001),
    mongoose = require('mongoose'),
    server = module.exports = express();

// MONGODB CONFIGURATION
// ====================
mongoose.connect('mongodb://localhost:27017/managingapp');
mongoose.connection.on('open', function () {
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
var ItemModel = mongoose.model('Item', ItemSchema);
var ItemInstanceModel = mongoose.model('ItemInstance', ItemInstanceSchema);

// SERVER CONFIGURATION
// ====================
server.configure(function () {

    server.use(express["static"](__dirname + "/../public"));

    server.use(express.errorHandler({

        dumpExceptions: true,

        showStack: true

    }));

    server.use(express.bodyParser())

    server.use(server.router);

});

// REST API
// =====================
server.get('/api/items', function (request, response) {
    return ItemModel.find(function (err, items) {
        if (!err) {
            return response.send(items);
        } else {
            return console.log(err);
        }
    });
});

server.get( '/api/items/:id', function( request, response ) {
    return ItemModel.findById( request.params.id, function( err, item ) {
        if( !err ) {
            return response.send( item );
        } else {
            return console.log( err );
        }
    });
});

server.post('/api/items', function (request, response) {
    var item = new ItemModel({
        gtin: request.body.gtin,
        name: request.body.name,
        inventory_id: request.body.inventory_id,
        state: request.body.state,
        description: request.body.description,
        created_at: Date.now(),
        updated_at: Date.now(),
        deleted_at: null

    });

    return item.save(function (err) {
        if (!err) {
            console.log('created');
            return response.send(item);
        } else {
            console.log(err);
        }
    });
});

server.put( '/api/items/:id', function( request, response ) {
    console.log( 'Updating item ' + request.body.name );
    return ItemModel.findById( request.params.id, function( err, item ) {
        // TODO: keep only the fields that can be updated, remove others
        item.title = request.body.name;
        item.author = request.body.inventory_id;
        item.releaseDate = request.body.state;
        item.description = request.body.description;
        item.updated_at = Date.now();

        return item.save( function( err ) {
            if( !err ) {
                console.log( 'item updated' );
                return response.send( item );
            } else {
                console.log( err );
            }
        });
    });
});

server.delete( '/api/items/:id', function( request, response ) {
    console.log( 'Deleting item with id: ' + request.params.id );
    return ItemModel.findById( request.params.id, function( err, item ) {
        return item.remove( function( err ) {
            if( !err ) {
                console.log( 'Item removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});

// SERVER
// ======

// Start Node.js Server
http.createServer(server).listen(port);

console.log('Welcome to Backbone-Require-Boilerplate!\n\nPlease go to http://localhost:' + port + ' to start using Require.js and Backbone.js');