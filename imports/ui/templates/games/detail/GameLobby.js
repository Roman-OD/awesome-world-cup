import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '/imports/api/games/games.js';

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
        if(status==='Locked-in'){
            return 'text-success'
        }else if (status==='Selecting') {
            return 'text-secondary'
        } else {
            return 'text-warning'
        }
    },
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
