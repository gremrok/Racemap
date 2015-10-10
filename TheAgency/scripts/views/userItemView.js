define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/userItem.html'], function ($, _, Backbone, Marionette, Handlebars, tmpl) {
    var UserItemView = Marionette.ItemView.extend({
        template: Handlebars.compile(tmpl),
        
    });
    return UserItemView;
});