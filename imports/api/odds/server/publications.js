import { Meteor } from 'meteor/meteor';
import { Odds } from '/imports/catalogs/catalog.js';



Meteor.publish('odds.all', function(){
  return Odds.find({});
});

Meteor.publish('odds.single', function(matchId){
	return Odds.find({gameId:matchId});
});
