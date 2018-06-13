import { Teams, Groups, Matches } from '../catalogs.js';

Meteor.publish('groups.all', function() {
  return Groups.find({});
});

Meteor.publish('teams.all', function() {
  return Teams.find({});
});

Meteor.publish('matches.all', function () {
  return Matches.find({})
})