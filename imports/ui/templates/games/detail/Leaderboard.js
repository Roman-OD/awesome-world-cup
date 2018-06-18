import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '/imports/api/games/games.js';

import './Leaderboard.html'

Template.Leaderboard.onCreated(function(){

	this.players = new ReactiveVar([]);
	this.autorun(() => {
		const game = Games.find({_id: FlowRouter.getParam("gameId")}).fetch()[0];
		if(game){
			const players = game.players.sort(function(a,b){return b.score - a.score})
			this.players.set(players);
		}
	})
})

Template.Leaderboard.helpers({
 	getPlayers: function () {
        return Template.instance().players.get();
	},
	formatIndex: function(index){
		return ++index;
	}
})