/**
 * Created by Vjaceslavs on 21/12/2015.
 */
/**
 * Created by Vjaceslavs on 17/12/2015.
 */
define(["jquery", "backbone", "text!templates/heading.html", "text!templates/addItem.html"],

    function($, Backbone, Heading, AddItem){

        var cat = "";

        var AddItemView = Backbone.View.extend({

            el: ".content",

            initialize: function(category) {

                cat = { category: category };
                this.render();

            },

            // View Event Handlers
            events: {
            },

            // render library by rendering each book in its collection
            render: function() {
                this.template = _.template(Heading, cat);
                this.$el.html(this.template);
                this.template = _.template(AddItem);
                this.$el.append(this.template);
            }

        });

        return AddItemView;

    }

);