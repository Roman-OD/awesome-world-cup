import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '/imports/api/games/games.js';

import './Games.html';
import './NewGameModal.js';

Template.Games.onCreated(function(){
  this.autorun(() => {
    this.subscribe('users.all');
    this.subscribe('games.byCreator', Meteor.user().username);
  })
});

Template.Games.helpers({
  games: ()=>{

    return Games.find({}).fetch();
  },
  nogames: ()=>{
    if (Games.find({}).count() > 0)
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
    console.log('opening modal')
    Modal.show('NewGameModal')
  }
})
