import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '/imports/api/games/games.js';

import '../TeamSelection.js'

import './GameLobby.html'

Template.GameLobby.onCreated(function(){
    
})

Template.GameLobby.helpers({
    getGame: function() {
        return Games.find({}).fetch()[0];
    },
    getPlayers: function () {
        return Games.find({}).fetch()[0].players;
    },
    getStatusClass: function (status) {
        if(status==='Locked-in'){
            return 'text-success'
        }else if (status==='Selecting') {
            return 'text-secondary'
        } else {
            return 'text-warning'
        }
    },
    allReady: function(){
       let players = Games.find({}).fetch()[0].players;
       let readyCount = 0;
       for(var i = 0; i < players.length;i++){
            if(players[i].status == "Locked-in")
                readyCount++;
       }
       if(readyCount==players.length)
            return true;
        else
            return false;
    }
})