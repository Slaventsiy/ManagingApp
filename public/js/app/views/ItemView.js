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
                //TODO: change cid to id once connected to the database
                console.log(this.checked);
                this.template = _.template(template, {'attributes': this.model.attributes, 'id': this.model.id});

                this.$el.html(this.template);

                return this;

            }

        });

        return ItemView;

    }

);