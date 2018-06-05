import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './Header.html';
import './web/HeaderWeb.js';

Template.Header.events({
  'click #logout': () => {
    AccountsTemplates.logout();
  }
});
