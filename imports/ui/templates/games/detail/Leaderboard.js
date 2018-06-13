import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '/imports/api/games/games.js';

import './Leaderboard.html'

Template.Leaderboard.helpers({
 	getPlayers: function () {
        return Games.find({}).fetch()[0].players.sort(function(a, b){return b-a});;
	}
})