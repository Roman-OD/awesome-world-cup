import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './HeaderWeb.html';

Template.HeaderWeb.events({
  'click #football-icon': () => {
    Meteor.logout();
  }
});
