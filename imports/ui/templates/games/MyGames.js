import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '/imports/api/games/games.js'

import './MyGames.html'

Template.MyGames.onCreated(function(){
  this.autorun(() => {
    this.subscribe('users.all');
    this.subscribe('games.all');
  })
});

Template.MyGames.helpers({
    games: () => {
         return Games.find({'players.name': Meteor.user().username}).fetch();
    },
    noGames: ()=>{
    	console.log(Games.find({'players.name': Meteor.user().username}).fetch());
    if (Games.find({'players.name': Meteor.user().username}).count() > 0)
      return false;
    else
      return true;
  },
})

Template.MyGames.events({
    'click .gameDetailBtn' : (event) => {
    	event.preventDefault();
    	const gameId = event.currentTarget.id;
    	console.log(gameId);
        FlowRouter.go('/games/detail/' + gameId);
    }
})
