/**
 * Created by Vjaceslavs on 17/12/2015.
 */
define(["jquery", "backbone", "collections/Items", "views/ItemView", "text!templates/heading.html"],

    function($, Backbone, Collection, ItemView, Heading){

        var cat = "";

        var ItemsView = Backbone.View.extend({

            el: ".content",

            initialize: function(initialItems, category) {

                cat = { category: category };
                this.collection = new Collection(initialItems);
                this.render();

            },

            // View Event Handlers
            events: {
            },

            // render library by rendering each book in its collection
            render: function() {
                this.template = _.template(Heading, cat);
                this.$el.html(this.template);
                this.collection.each(function( item ) {
                    this.renderItem( item );
                }, this );
                this.$el.append('<a href="#/'+ Backbone.history.fragment + '/add"><button id="add" class="btn btn-default">Add</button></a>');
            },

            // render a book by creating a BookView and appending the
            // element it renders to the library's element
            renderItem: function( item ) {
                var itemView = new ItemView({
                    model: item
                });
                this.$el.append( itemView.render().el );
            }

        });

        return ItemsView;

    }

);