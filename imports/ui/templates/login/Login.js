import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { addUser, loginUser } from '/imports/api/users/methods.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './Login.html';

Template.Login.onCreated(function() {
  this.signingUp = new ReactiveVar(false);
});

Template.Login.helpers({
  signingUp() {
    return Template.instance().signingUp.get();
  }
});

Template.Login.events({
  'click #sign-up': (event, instance) => {
    if (instance.signingUp.get()) {
    const user = {
      username: $('#username').val(),
      email: $('#email').val(),
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
  } else {
    instance.signingUp.set(true);
  }
  },
  'click #sign-in': () => {
    Meteor.loginWithPassword( $('#username').val(), $('#password').val(), (err, resp) => {
      if(err)
        console.log(err);
      else
        FlowRouter.go('/');
    });
  },
  'click #login-link': (event, instance) => {
    instance.signingUp.set(false);
  }
});
