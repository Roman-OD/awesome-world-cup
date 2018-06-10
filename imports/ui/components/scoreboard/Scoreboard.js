import { Meteor } from 'meteor/meteor';
import { Users } from '/imports/api/users/users.js';
import './Scoreboard.html';

Template.Scoreboard.onCreated(function(){
  this.players = new ReactiveVar([]);
  this.autorun(() => {
    this.subscribe('users.all');
  })
});

Template.Scoreboard.helpers({
	users: () => {
		return Users.find({}).fetch();
	}
});