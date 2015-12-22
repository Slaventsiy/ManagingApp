/**
 * Created by Vjaceslavs on 17/12/2015.
 */
// Collection.js
// -------------
define(["jquery","backbone","models/Item"],

    function($, Backbone, Item) {

        var Items = Backbone.Collection.extend({

            model: Item,
            url: '/api/items' // TODO: implement REST API

        });

        return Items;

    }

);