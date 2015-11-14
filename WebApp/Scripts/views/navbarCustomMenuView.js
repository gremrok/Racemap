define(
    [
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'handlebars',
        'text!../../templates/navbarCustomMenu.html',
        'views/msgNotifyView',
        'views/notifyView',
        'views/taskView',
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
        NotifyView,
        TaskView,
        UserItemView
    ) {
    var NavbarCustomMenuView = Marionette.ItemView.extend({
        template: Handlebars.compile(tmpl),
        tagName: 'ul',
        className: 'nav navbar-nav',
        initialize: function (options) {
            this.options = options;
        },
        ui: {
            messagesMenuItem: '.messages-menu',
            notificationsMenuItem: '.notifications-menu',
            tasksMenuItem: '.tasks-menu'
        },
        onRender: function () {
            
            var model = this.model;
            
            var msgNotifyView = new MsgNotifyView({ model: model });
            msgNotifyView.render();
            this.ui.messagesMenuItem.html(msgNotifyView.$el.html());
            
            
            var notifyView = new NotifyView({model: model});
            notifyView.render();
            this.ui.notificationsMenuItem.html(notifyView.$el.html());

            var taskView = new TaskView({model: model});
            taskView.render();
            this.ui.tasksMenuItem.html(taskView.$el.html());

            //var userItem = {};
            //var userItemView = new UserItemView(userItem);
            //userItemView.render();
            //this.ui.userMenuItem.html(userItemView.$el.html());
        }
    });
    return NavbarCustomMenuView;
});