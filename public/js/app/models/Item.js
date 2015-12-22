/**
 * Created by Vjaceslavs on 17/12/2015.
 */
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Item = Backbone.Model.extend({

            initialize: function() {

            },

            // TODO: add id once connected to the database
            defaults: {
                name: '',
                checked: false,
                category: 'products',
                state: 'Available',
                description: '',
                barcode: ''
            },

            validate: function(attrs) {

            }

        });

        return Item;

    }

);