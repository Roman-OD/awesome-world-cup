import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '/imports/api/games/games.js';
import { startGame } from '/imports/api/games/methods.js';

import '../TeamSelection.js'

import './GameLobby.html'

Template.GameLobby.onCreated(function(){
    this.subscribe('games.all');
})

Template.GameLobby.helpers({
    game: function() {
        return Games.find({}).fetch()[0];
    },
    getStatusClass: function (status) {
        if(status==='locked-in'){
            return 'text-success'
        }else if (status==='selecting') {
            return 'text-secondary'
        } else {
            return 'text-warning'
        }
    },
    isLockedIn: function() {
      const game = Games.find({_id: FlowRouter.getParam('gameId')}).fetch()[0];
      if (game) {
        const player = game.players.find((player) => { return player.name === Meteor.user().username; });
        if (player.status === 'locked-in') {
          return true;
        }
        return false;
      }
      return false;
    },
    teams: function() {
      const game = Games.find({_id: FlowRouter.getParam('gameId')}).fetch()[0];
      if (game) {
        const player = game.players.find((player) => { return player.name === Meteor.user().username; });
        if (player.seed1 && player.seed2 && player.seed3 && player.seed4) {
          return [player.seed1, player.seed2, player.seed3, player.seed4];
        }
        return false;
      }
      return false;
    },
    toUpperCase: function(value) {
      return value.toUpperCase();
    }
    // allReady: function(){
    //    let players = Games.find({}).fetch()[0].players;
    //    let readyCount = 0;
    //    for(var i = 0; i < players.length;i++){
    //         if(players[i].status == "Locked-in")
    //             readyCount++;
    //    }
    //    if(readyCount==players.length)
    //         return true;
    //     else
    //         return false;
    // }
})

Template.GameLobby.events({
    'click #startGame': (event) => {
        startGame.call({ gameID: FlowRouter.getParam("gameId")}, function(err, resp){
            if(err)
                console.log(err);
        })
    }
})
