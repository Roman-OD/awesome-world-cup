import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '/imports/api/games/games.js';

import './modals/AddPlayer.js'
import './modals/RemovePlayer.js'
import './modals/EmailPlayer.js'

import './Players.html'

Template.Players.onCreated(function(){
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

Template.Players.helpers({
    getPlayers: function () {
        return Games.find({}).fetch()[0].players;
    },
    showEmailBtn: function (status) {
        return status==='Pending Invitation' ? true : false
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