import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { addUser, loginUser } from '/imports/api/users/methods.js';

import './Login.html'

Template.Login.onCreated(function(){
});


Template.Login.helpers({

});

Template.Login.events({
  'click #submit-create': () => {
    const user = {
      username: $('#username').val(),
      password: $('#password').val()
    }
    addUser.call(user, function(err, resp){
      if(err)
        console.log(err);
      else {
        console.log("added new user successfully: " + resp);
      }
    })
  },
  'click #submit-login': () => {
    const user = {
      username: $('#username').val(),
      password: $('#password').val()
    }
    loginUser.call(user, function(err, resp){
      if(err)
        console.log(err);
      else {
        console.log("added new user successfully: " + resp);
      }
    })
  },
});
