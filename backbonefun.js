$(function(){

	var User = Backbone.Model.extend({

		defaults: function() {
		      return {
		        lastname: "nom",
		        firstname: "prenom"
		      };
		    },

	    initialize: function() {
	        if (!this.get("lastname")) {
	          this.set({"firstname": this.defaults.nom});
	          this.set({"lastname": this.defaults.nom});
	        }
	    }
	 });




	 var UserList = Backbone.Collection.extend({

		     model: User,
		     url: 'users.json'

     });

	var Users = new UserList;

	var UserView = Backbone.View.extend({

		    tagName:  "li",

		    template: _.template($('#user-template').text()),

		    initialize: function() {
		      this.model.bind('change', this.render, this);
		    },

		    render: function() {
		      this.$el.html(this.template(this.model.toJSON()));
		      return this;
		    }
	  });

	 var AppView = Backbone.View.extend({

		     el: $("#userapp"),

		     events: {
			      "click .add"   : "addUser"
			 },

		     initialize: function() {

		       Users.bind('add', this.addOne, this);
		       Users.bind('reset', this.addAll, this);
		       Users.bind('all', this.render, this);

		       Users.fetch();
		     },

		     render: function() {

		       if (Users.length) {

		       } else {

		       }

		     },

		     addOne: function(user) {
		       var view = new UserView({model: user});
		       this.$("#user-list").append(view.render().el);
		     },

		     addAll: function() {
		       Users.each(this.addOne);
		     },

		     addUser: function(e) {
		         Users.create({firstname: "nouveau", lastname: "nouveau"});
		     },

	     });

	     var App = new AppView;

});
