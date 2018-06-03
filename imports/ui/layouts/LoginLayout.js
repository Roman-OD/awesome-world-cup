import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { Session } from 'meteor/session'; //this would be used for setting device mode (desktop/mobile/tablet)

import './LoginLayout.html';

Template.LoginLayout.helpers({
  authInProcess() {
    if(Meteor.loggingIn() || Template.insance().subscriptionsReady() === false)
      return true;
    else
      return false;
  }
});
