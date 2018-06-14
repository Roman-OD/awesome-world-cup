import { Meteor } from 'meteor/meteor'
import { ReactiveVar } from 'meteor/reactive-var'
import { Users } from '/imports/api/users/users.js'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { createNewGame } from '/imports/api/games/methods.js'

import './NewGame.html';
import './detail/modals/AddPlayer.js'
import './detail/modals/RemovePlayer.js'


Template.NewGame.onCreated(function(){
    const playerList = [
            {name: Meteor.user().username, email: Meteor.user().emails[0].address}
             // {name: Meteor.user().username, email: "player@email.com"}
        // {name: 'Roman ODowd', email: 'roman.odowd@metixmedical.co.uk'},
        // {name: 'Kevin Hicher', email: 'kevin.hicher@metixmedical.co.uk'}
        ]
    this.data.players = new ReactiveVar(playerList)
})

Template.NewGame.helpers({
    getPlayers: function() {
        return Template.instance().data.players.get()
    }
})

Template.NewGame.events({
    'click .removePlayerBtn' : function(event) {
        const removePlayer = event.currentTarget.id;
        console.log(removePlayer);
        let confirmedPlayers = Template.instance().data.players.get();
        for(var i = 0;i<confirmedPlayers.length;i++){
            console.log(confirmedPlayers[i].name);
            if(confirmedPlayers[i].name==removePlayer){
                console.log("removing user");
                confirmedPlayers.splice(i, 1);
                console.log(confirmedPlayers);
                Template.instance().data.players.set(confirmedPlayers);
                console.log(Template.instance().data.players.get());
            }
        }

    },
    'submit #new-game'(event) {
        // Prevent default browser form submit
        event.preventDefault()

        // // Get value from form element
        const target = event.target
        const name = target.name.value

         let confirmedPlayers = [];
        for(var i = 0; i < Template.instance().data.players.get().length; i++){
          // let player = Users.find({"username":Template.instance().data.players.get()[i].username}).fetch()[0];
          formattedPlayer = {
            name: Template.instance().data.players.get()[i].name,
            status: "selecting",
            email: Template.instance().data.players.get()[i].email,
            score: 0,
            rerollCount: 0,
            lockedIn: false,
          }
          confirmedPlayers.push(formattedPlayer);
        }



        let game = {
            name,
            creator: Meteor.user().username,
            lockedIn: false,
            players : confirmedPlayers
        }

        // console.log(game)

        // // Clear form
        target.name.value = ''
        // //TODO: clear players list


       
        // const game = {
        //   name: $('#game-name-field').val(),
        //   creator: Meteor.user().username,
        //   players: confirmedPlayers
        // }
        createNewGame.call(game, function(err, resp){
          if(err)
            console.log(err);
          else
            FlowRouter.go('/games/detail/'+resp);
        })



    }
})
