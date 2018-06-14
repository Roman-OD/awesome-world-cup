import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '/imports/api/games/games.js';

import './MyGames.html'

Template.MyGames.onCreated(function(){
  this.autorun(() => {
    this.subscribe('users.all');
    this.subscribe('games.all');
  })
});

Template.MyGames.helpers({
  games() {
    // return Games.find({'players': { $elemMatch: {email: Meteor.user().emails[0].address} } }).fetch();
    return Games.find({'players': { $elemMatch: {name: Meteor.user().username} } }).fetch();

  },
  noGames() {
    // return (Games.find({'players': { $elemMatch: {email: Meteor.user().emails[0].address} } }).count() === 0)
    return Games.find({'players': { $elemMatch: {name: Meteor.user().username} } }).count() === 0;

  },
  noInvitations() {
    if (Meteor.user().profile.invitations)
      return ( Meteor.user().profile.invitations.length === 0 );
  },
  invitations() {
    return Meteor.user().profile.invitations;
  }
})

Template.MyGames.events({
    'click .gameDetailBtn' : (event) => {
    	event.preventDefault();
    	const gameId = event.currentTarget.id;
      FlowRouter.go('/games/detail/' + gameId);
    }
})
