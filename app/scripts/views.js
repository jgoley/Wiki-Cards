(function(){

    'use strict';

    Wiki.Views.ApplicationView = BaseView.extend({
        className: 'pollinate',
        template: _.template($('#application-template').html()),
        
        initialize: function(opts){
            Wiki.Session = new Wiki.Models.Session({user: Parse.User.current()})
            this.model = Wiki.Session;
            this.render();
            this.listenTo(Wiki.Session, 'change', this.render);
        },
        render: function(){
            if ( Wiki.Session.get('user')) var user = Wiki.Session.get('user').toJSON();
            this.$el.html(this.template({user: user}));
            new Wiki.Views.HeaderView({
                $container: $('header'),
            })
            new Wiki.Views.FooterView({
                $container:  $('footer')
            })
        }

    });



})();
