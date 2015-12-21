/**
 * Created by Vjaceslavs on 17/12/2015.
 */
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Item = Backbone.Model.extend({

            initialize: function() {

            },

            defaults: {
                name: '',
                checked: '',
                category: ''
            },

            validate: function(attrs) {

            }

        });

        return Item;

    }

);