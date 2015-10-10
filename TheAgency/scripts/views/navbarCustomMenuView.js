define(
    [
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'handlebars',
        'text!../../templates/navbarCustomMenu.html',
        'views/msgNotifyView',
        'views/notifyCollectionView',
        'views/taskCollectionView',
        'views/userItemView'
    ],
    function (
        $,
        _,
        Backbone,
        Marionette,
        Handlebars,
        tmpl,
        MsgNotifyView,
        NotifyCollectionView,
        TaskCollectionView,
        UserItemView
    ) {
    var NavbarCustomMenuView = Marionette.ItemView.extend({
        template: Handlebars.compile(tmpl),
        tagName: 'ul',
        className: 'nav navbar-nav',
        initialize: function (options) {
            this.options = options;
        },

        onRender: function () {
            
            var model = this.model;
            var messageCollection = model.get('messages');
            var notoficationCollection = model.get('notifications');
            var taskCollection = model.get('tasks');

            var msgNotifyView = new MsgNotifyView({ model: model });
            msgNotifyView.render();
            console.log(msgNotifyView.$el.html());
            
            //var notifyCollection = [];
            //var notifyCollectionView = new NotifyCollectionView(notifyCollection);
            //notifyCollectionView.render();
            //this.ui.notificationsMenuItem.html(notifyCollectionView.$el.html());

            //var taskCollection = [];
            //var taskCollectionView = new TaskCollectionView(taskCollection);
            //taskCollectionView.render();
            //this.ui.tasksMenuItem.html(taskCollectionView.$el.html());

            //var userItem = {};
            //var userItemView = new UserItemView(userItem);
            //userItemView.render();
            //this.ui.userMenuItem.html(userItemView.$el.html());
        }
    });
    return NavbarCustomMenuView;
});