import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Users } from '/imports/api/users/users.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './NewGameModal.html';

Template.NewGameModal.onCreated(()=> {
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
    console.log(this.players.get());
    if (Template.instance().players.get().length = 0)
      return true;
    else
      return false;

  }
});

Template.NewGameModal.events({
  'click .add-user': (event) => {
    let user = event.target.id;
    console.log(user);
    let players = this.players.get();
    console.log(players);
    if(players.indexOf(user)==-1){
        console.log("adding player to array");
        players.push(user);
       this.players.set(players);
       console.log(players);
    }
     
    else{
      console.log("splicing user");
      players.splice(players.indexOf(user), 1);
      this.players.set(players);
    }
      
  }
});
