import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '/imports/api/games/games.js';

import './Games.html';
import './NewGameModal.js';

Template.Games.onCreated(function(){
  this.autorun(() => {
    this.subscribe('users.all');
    this.subscribe('games.all');
  })
});

Template.Games.helpers({
  creatorGames: ()=>{
    return Games.find({'creator': Meteor.userId()}).fetch();
  },
  noCreatorGames: ()=>{
    if (Games.find({'creator': Meteor.userId()}).count() > 0)
      return false;
    else
      return true;

  },
  memberGames: ()=>{
    return Games.find({'players.id': Meteor.userId()}).fetch();
  },
  noMemberGames: ()=>{
    if (Games.find({'players.id': Meteor.userId()}).count() > 0)
      return false;
    else
      return true;
  },
  players: (game)=>{
    let playersLookup = [];
    for(var i=0;i<game.players.length;i++){
      playersLookup.push(Users.find({_id: game.players[i]}).fetch()[0].username);
    }
    console.log(playersLookup);
    return playersLookup;
    
  }
});

Template.Games.events({
  'click #create-new-game': (event) => {
    console.log('opening modal');
    Modal.show('NewGameModal');
  }
})
