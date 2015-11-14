define(['jquery', 'underscore', 'backbone', 'marionette', 'views/taskItemView'], function ($, _, Backbone, Marionette, TaskItemView) {
    var TaskCollectionView = Marionette.CollectionView.extend({
        childView: TaskItemView,
        tagName: 'ul',
        className: 'menu'
    });
    return TaskCollectionView;
});