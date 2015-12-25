/**
 * Created by Vjaceslavs on 17/12/2015.
 */
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Item = Backbone.Model.extend({

            urlRoot: 'api/items',

            initialize: function() {

            },

            defaults: {
                inventory_id: 1,
                checked: false,
                category: 'products'
            },

            validate: function(attrs) {

            },

            parse: function( response ) {
                response.id = response._id;
                return response;
            }

        });

        return Item;

    }

);