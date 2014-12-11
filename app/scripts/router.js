(function(){

    'use strict';

    Wiki.Router = Parse.Router.extend({

        routes: {
            '': 'index',
            'login': 'login',
            'logout': 'logout',
            'newuser': 'newUser',
            'account': 'account',
            'change-password': 'changePassword',
            'user/:user_id': 'user',
            'user/:user_id/reviews': 'reviews',
            'requests': 'requests',
            'requests/archived': 'requestsArchived',
            'request/:request_id': 'request',
            'request/:request_id/edit': 'editRequest',
            'reviews': 'reviews',
            'messages': 'messages',
            'messages/message_id': 'messageView',
            'search': 'search',
            'search/:query_text': 'search',
        },

        initialize: function() {

            if(Parse.User.current()){
                Parse.User.current().fetch();
                this.currentUser = Parse.User.current();
                this.userType = this.currentUser.get('userType');
            }
            new Wiki.Views.ApplicationView({
                el: 'body'
            });
        },

        index: function() {
            disposeViews();
            if (!Wiki.Session.get('user')) {
                this.goLogin();
            } else {
                if (Wiki.Session.get('user').get('userType') === 'beekeeper') {
                    new Wiki.Collections.Requests({
                        user: Wiki.Session.get('user')
                    }).getAll().then(function(collection){
                        Wiki.currentView = new Wiki.Views.BeekeeperIndex({
                            $container: $('.main-container'),
                            collection: collection
                        });    
                    })
                } else {
                    new Wiki.Collections.Requests({
                        user: Wiki.Session.get('user')
                    }).getAll().then(function(collection){
                        Wiki.currentView = new Wiki.Views.FarmerIndex({
                            $container: $('.main-container'),
                            collection: collection
                        });
                    })
                }
            }
        },

        login: function() {
            disposeViews();
            Wiki.currentView = new Wiki.Views.LoginView({
                $container: $('.main-container'),
                session: new Wiki.Models.Session()
            });
        },

        logout: function(){
            disposeViews();
            Parse.User.logOut();
            Wiki.Session.set('user', null);
            WikiApp.navigate('login', {
                trigger: true
            });
        },

        newUser: function() {
            disposeViews();
            Wiki.currentView = new Wiki.Views.NewUserView({
                $container: $('.main-container')
            });
        },

        account: function() {
            disposeViews();
            if (!Wiki.Session.get('user')) {
                this.goLogin();
            } else{
                Wiki.currentView = new Wiki.Views.EditAccountView({
                    $container: $('.main-container'),
                    model: Wiki.Session.get('user')
                });
            }
        },
    });
})();