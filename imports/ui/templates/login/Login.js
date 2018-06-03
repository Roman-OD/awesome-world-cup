import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './Login.html'

Template.Login.onCreated(function(){
  this.showLogin = new ReactiveVar(true)
});


Template.Login.helpers({
  loginActive(){
    return Template.instance().showLogin.get();
  }
});

Template.Login.events({
  'click #activate-login': () => {
    Template.instance().showLogin.set(true);
  },
  'click #deactivate-login': () => {
    Template.instance().showLogin.set(false);
  }
})
