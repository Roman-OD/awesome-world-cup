import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Users } from '/imports/api/users/users.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { createNewGame } from '/imports/api/games/methods.js';

import './NewGameModal.html';

Template.NewGameModal.onCreated(function() {
  this.players = new ReactiveVar([]);
});

Template.NewGameModal.helpers({
  users: () => {
    return Users.find({}).fetch();
  },
  players: () => {
    return Template.instance().players.get();
  },
  getName: (player)=>{
    return Users.find({_id: player}).fetch()[0].username;
  },
  noPlayers: () => {
    if (Template.instance().players.get().length == 0)
      return true;
    else
      return false;

  }
});

Template.NewGameModal.events({
  'click .add-user': (event) => {
    let user = event.target.id;
    let players = Template.instance().players.get();
    if(players.indexOf(user)==-1){
        players.push(user);
       Template.instance().players.set(players);
       console.log(players);
    }
     
    else{
      players.splice(players.indexOf(user), 1);
      Template.instance().players.set(players);
    }
      
  },
  'click #create-game-button': (event) => {
    let confirmedPlayers = [];
    for(var i = 0; i < Template.instance().players.get().length; i++){
      let player = Users.find({_id:Template.instance().players.get()[i]}).fetch()[0];
      formattedPlayer = {
        id: player._id,
        name: player.username,
        score: 0,
        rerollCount: 0,
        lockedIn: false,
        teams: {
          seed_1: "unassigned",
          seed_2: "unassigned",
          seed_3: "unassigned",
          seed_4: "unassigned"
        }
      }

      confirmedPlayers.push(formattedPlayer); 
    }
    console.log(confirmedPlayers);
    const game = {
      name: $('#game-name-field').val(),
      creator: Meteor.user()._id,
      players: confirmedPlayers,
      started: false
    }
    createNewGame.call(game, function(err, resp){
      if(err)
        console.log(err);
      else
        console.log('game id: ' + resp);
    })

  }
});
