define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/notifyItem.html'], function ($, _, Backbone, Marionette, Handlebars, tmpl) {
    var NotifyItemView = Marionette.ItemView.extend({
        template: Handlebars.compile(tmpl),
        tagName: 'li'
    });
    return NotifyItemView;
});