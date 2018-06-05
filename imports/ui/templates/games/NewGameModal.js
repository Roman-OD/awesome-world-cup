import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Users } from '/imports/api/users/users.js';

import './NewGameModal.html';

Template.NewGameModal.helpers({
  users: () => {
    return Users.find({}).fetch();
  }
});
