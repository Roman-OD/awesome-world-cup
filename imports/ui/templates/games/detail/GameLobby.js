import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../TeamSelection.js'

import './GameLobby.html'

Template.GameLobby.onCreated(function(){
    const playerList = [
        {name: 'Roman ODowd', email: 'roman.odowd@metixmedical.co.uk', status: 'Locked-in',
            teams: [{name: 'Belgium', icon: "be.png", 'seed': 1}, {name: 'Germany', icon: 'de.png'}]},
        {name: 'Kevin Hicher', email: 'kevin.hicher@metixmedical.co.uk', status: 'Selecting',
            teams: [{name: 'France', icon: "fr.png"}]},
        {name: 'Pablo Perez', email: 'pablo@metixmedical.co.uk', status: 'Pending Invitation',
            teams: [{name: 'Mexico', icon: "mx.png"}]}
    ]
    this.players = new ReactiveVar(playerList)
})

Template.GameLobby.helpers({
    getPlayers: function () {
        return Template.instance().players.get()
    },
    getStatusClass: function (status) {
        if(status==='Locked-in'){
            return 'text-success'
        }else if (status==='Selecting') {
            return 'text-secondary'
        } else {
            return 'text-warning'
        }
    }
})