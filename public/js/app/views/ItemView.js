/**
 * Created by Vjaceslavs on 17/12/2015.
 */
define(["jquery", "backbone", "models/Item", "text!templates/item.html"],

    function($, Backbone, Model, template){

        var ItemView = Backbone.View.extend({

            tagName: "ul",
            className: "item",

            initialize: function() {

                this.render();

            },

            // View Event Handlers
            events: {
            },

            render: function() {

                this.template = _.template(template, this.model.attributes);

                this.$el.html(this.template);

                return this;

            }

        });

        return ItemView;

    }

);