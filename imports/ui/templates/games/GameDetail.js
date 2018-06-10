import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './modals/AddPlayer.js'
import './modals/RemovePlayer.js'
import './modals/EmailPlayer.js'

import './GameDetail.html'

Template.GameDetail.onCreated(function(){
    const playerList = [
        {name: 'Roman ODowd', email: 'roman.odowd@metixmedical.co.uk', status: 'Locked-in'},
        {name: 'Kevin Hicher', email: 'kevin.hicher@metixmedical.co.uk', status: 'Selecting'},
        {name: 'Pablo Perez', email: 'pablo@metixmedical.co.uk', status: 'Pending Invitation'}
    ]
    this.players = new ReactiveVar(playerList)
})

Template.GameDetail.helpers({
    gameId: () => {
        return FlowRouter.getParam("gameId")
    },
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
    },
    showEmailBtn: function (status) {
       return status==='Pending Invitation' ? true : false
    }

})

Template.GameDetail.events({

})