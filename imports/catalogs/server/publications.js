import { Teams, Groups } from '../catalogs.js';

Meteor.publish('groups.all', function() {
  return Groups.find({});
});

Meteor.publish('teams.all', function() {
  return Teams.find({});
});
