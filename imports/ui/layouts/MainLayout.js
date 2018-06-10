import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { Session } from 'meteor/session'; //this would be used for setting device mode (desktop/mobile/tablet)

import './header/Header.js';
import './MainLayout.html';

Template.MainLayout.helpers({
  authInProcess(){
    if(Meteor.loggingIn() || Template.instance().subscriptionsReady() === false)
      return true;
    else
      return false;
  },

})