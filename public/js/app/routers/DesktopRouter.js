// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "models/Model", "views/View", "collections/Items", "views/ItemsView", "views/AddItemView"],

    function($, Backbone, Model, View, Items, ItemsView, AddItemView) {
        var DesktopRouter = Backbone.Router.extend({


            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index",
                "items/:category": "items",
                "items/:category/*add": "add"

            },

            index: function() {

                // Instantiates a new view which will render the header text to the page
                new View();

            },

            items: function(category) {
                new ItemsView(category);
            },

            add: function(category){
                new AddItemView(category);
            }

        });

        // Returns the DesktopRouter class
        return DesktopRouter;

    }

);