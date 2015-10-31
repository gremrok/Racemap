define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/taskItem.html'], function ($, _, Backbone, Marionette, Handlebars, tmpl) {
    var TaskItemView = Marionette.ItemView.extend({
        template: Handlebars.compile(tmpl),
        tagName: 'li'
    });
    return TaskItemView;
});