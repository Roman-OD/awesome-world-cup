import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '/imports/api/games/games.js';

import './detail/GameLobby.js'
import './detail/Leaderboard.js'
import './detail/Players.js'
import './detail/UpcomingMatches.js'

import './GameDetail.html'

Template.GameDetail.onCreated(function(){

    this.autorun(() => {
        this.subscribe('users.all');
        this.subscribe('games.single', FlowRouter.getParam("gameId"));
    });

    const playerList = [
        {name: 'Roman ODowd', email: 'roman.odowd@metixmedical.co.uk', status: 'Locked-in',
            teams: [{name: 'Belgium', icon: "be.png", 'seed': 1}, {name: 'Germany', icon: 'de.png'}]},
        {name: 'Kevin Hicher', email: 'kevin.hicher@metixmedical.co.uk', status: 'Selecting',
            teams: [{name: 'France', icon: "fr.png"}]},
        {name: 'Pablo Perez', email: 'pablo@metixmedical.co.uk', status: 'Pending Invitation',
            teams: [{name: 'Mexico', icon: "mx.png"}]}
    ]
    this.players = new ReactiveVar(playerList)
    this.currentTab = new ReactiveVar( "GameLobby")
})

Template.GameDetail.helpers({
    gameName: () => {
        return Games.find({}).fetch()[0].name;
    },
    tab: function() {
        return Template.instance().currentTab.get()
    },
    tabData: function() {
        var tab = Template.instance().currentTab.get()
        var data = {
            "players": [],
            "leaderboard": [],
            "upcoming-matches": [],
            "game-lobby": []
        }
        return data[tab];
    },
    gameReady: ()=>{
        return Games.find({}).fetch()[0].lockedIn;
    }

})

Template.GameDetail.events({
    'click .nav-pills li': function( event, template ) {
        let currentTab = $(event.target).closest("li")
        let tabRef = $(event.target).closest("a")

        tabRef.addClass("active")
        $( ".nav-pills a" ).not(tabRef).removeClass("active")

        template.currentTab.set(currentTab.data("template"))
    }
})