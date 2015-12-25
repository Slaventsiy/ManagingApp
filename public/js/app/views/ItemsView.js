/**
 * Created by Vjaceslavs on 17/12/2015.
 */
define(["jquery", "backbone", "collections/Items", "views/ItemView", "text!templates/heading.html"],

    function($, Backbone, Collection, ItemView, Heading){

        var cat = "";

        var ItemsView = Backbone.View.extend({

            el: ".content",

            initialize: function(category) {

                cat = { category: category };
                this.collection = new Collection();
                this.collection.fetch({reset: true});


                this.listenTo( this.collection, 'add', this.renderItem );
                this.listenTo( this.collection, 'reset', this.render );
                this.listenTo( this.collection, 'remove', this.render);
            },

            // View Event Handlers
            events: {
                'click #delete': 'deleteItems',
                'click [type="checkbox"]': 'checked'
            },

            deleteItems: function (e) {
                e.preventDefault();

                this.collection.each(function( item ) {
                    if (item.get("checked")){
                        item.destroy();
                    }
                }, this );
            },

            checked: function(e){
                var id = e.target.id;
                var currentValue = this.collection.get(id).get("checked");
                this.collection.get(id).set('checked', !currentValue);
            },

            // render library by rendering each book in its collection
            render: function() {
                this.template = _.template(Heading, cat);
                this.$el.html(this.template);
                this.collection.each(function( item ) {
                    this.renderItem( item );
                }, this );
                this.$el.append('<a href="#/'+ Backbone.history.fragment + '/add"><button id="add" class="btn btn-default">Add</button></a>');
                this.$el.append('<button id="delete" class="btn btn-default">Delete</button>');
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