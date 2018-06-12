import { Meteor } from 'meteor/meteor';
import { Games } from '../games.js';



Meteor.publish('games.all', function(){
  return Games.find({}, Games.publicFields);
});


Meteor.publish('games.byCreator', function(creator){
  return Games.find({'creator': creator}, Games.publicFields);
});

Meteor.publish('games.single', function(gameId){
	return Games.find({_id:gameId});
});