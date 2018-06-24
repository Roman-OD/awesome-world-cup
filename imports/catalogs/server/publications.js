import { Teams, Groups, Matches, Odds } from '../catalogs.js';

Meteor.publish('groups.all', function() {
  return Groups.find({});
});

Meteor.publish('teams.all', function() {
  return Teams.find({});
});

Meteor.publish('matches.all', function () {
  return Matches.find({})
})

Meteor.publish('odds.all', function(){
  return Odds.find({})
});

Meteor.publish('odds.single', function(matchId){
	return Odds.find({gameId:matchId})
});
