define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/msgNotifyItem.html'], function ($, _, Backbone, Marionette, Handlebars, tmpl) {
    var MsgNotifyItemView = Marionette.ItemView.extend({
        template: Handlebars.compile(tmpl),
        tagName: 'li'
    });
    return MsgNotifyItemView;
});