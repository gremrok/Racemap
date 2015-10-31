define(['jquery', 'underscore', 'backbone', 'marionette', 'handlebars', 'text!../../templates/task.html', 'views/taskCollectionView'], function ($, _, Backbone, Marionette, Handlebars, tmpl, TaskCollectionView) {
    var TaskView = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'dropdown tasks-menu',
        template: Handlebars.compile(tmpl),
        templateHelpers: function () {
            return { count: this.model.get('tasks').length };
        },
        onRender: function () {
            var view = new TaskCollectionView({
                collection: this.model.get('tasks')
            });
            view.render();
            view.$el.appendTo($('.tasks', this.$el));
            return this;
        }
    });
    return TaskView;
});