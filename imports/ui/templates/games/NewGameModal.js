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
  noPlayers: () => {
    console.log("checking player count....");
    console.log(Template.instance().players.get());
    if (Template.instance().players.get().length == 0)
      return true;
    else
      return false;

  }
});

Template.NewGameModal.events({
  'click .add-user': (event) => {
    let user = event.target.id;
    console.log(user);
    let players = Template.instance().players.get();
    console.log(players);
    if(players.indexOf(user)==-1){
        console.log("adding player to array");
        players.push(user);
       Template.instance().players.set(players);
       console.log(players);
    }
     
    else{
      console.log("splicing user");
      players.splice(players.indexOf(user), 1);
      Template.instance().players.set(players);
    }
      
  },
  'click #create-game-button': (event) => {
    let confirmedPlayers = [];
    for(var i = 0; i < Template.instance().players.get().length; i++){
      let player = Users.find({"username":Template.instance().players.get()[i]}).fetch()[0];
      formattedPlayer = {
        id: player._id,
        score: 0
      }
      confirmedPlayers.push(formattedPlayer);
    }
    const game = {
      name: $('#game-name-field').val(),
      creator: Meteor.user().username,
      players: confirmedPlayers
    }
    createNewGame.call(game, function(err, resp){
      if(err)
        console.log(err);
      else
        console.log('game id: ' + resp);
    })

  }
});
