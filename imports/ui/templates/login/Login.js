import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { addUser, loginUser } from '/imports/api/users/methods.js';

import './Login.html';

Template.Login.events({
  'click #sign-up': () => {
    const user = {
      username: $('#username').val(),
      password: $('#password').val()
    }
    addUser.call(user, function(err, resp){
      if(err)
        console.log(err);
      else {
        Meteor.loginWithPassword( $('#username').val(), $('#password').val(), (err, resp) => {
          if(err)
            console.log(err);
          else
            FlowRouter.go('/');
        });
      }
    })
  },
  'click #sign-in': () => {
    Meteor.loginWithPassword( $('#username').val(), $('#password').val(), (err, resp) => {
      if(err)
        console.log(err);
      else
        FlowRouter.go('/');
    });
  },
});
