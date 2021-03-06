/**
 * Created by Vjaceslavs on 21/12/2015.
 */
/**
 * Created by Vjaceslavs on 17/12/2015.
 */
define(["jquery", "backbone", "models/Item", "collections/Items", "text!templates/heading.html", "text!templates/addItem.html"],

    function($, Backbone, Item, Collection, Heading, AddItem){

        var cat = "";

        var AddItemView = Backbone.View.extend({

            el: ".content",

            initialize: function(category) {

                cat = { category: category, filter: "" };
                this.collection = new Collection();
                this.collection.fetch({reset: true});
                this.render();

            },

            // View Event Handlers
            events: {
                'click #submit': 'addItem'
            },

            addItem: function (e){
                e.preventDefault();

                var formData = cat;

                $('form').find('.form-control').each(function(i,el){
                    if($(el).val() != '')
                    {
                        formData[el.id] = $(el).val();
                    }
                });

                this.collection.create(formData);
                var url = '#/items/' + cat['category'];
                Backbone.history.navigate(url, {trigger: true});
            },

            // render library by rendering each book in its collection
            render: function() {
                this.template = _.template(Heading, cat);
                this.$el.html(this.template);
                $("#mySearch").remove();
                this.template = _.template(AddItem);
                this.$el.append(this.template);
            }

        });

        return AddItemView;

    }

);