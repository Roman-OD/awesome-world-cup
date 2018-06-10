import './NewGame.html';
import './modals/AddPlayer.js'
import { ReactiveVar } from 'meteor/reactive-var'

Template.NewGame.onCreated(function(){
    const playerList = [
        {name: 'Roman ODowd', email: 'roman.odowd@metixmedical.co.uk'},
        {name: 'Kevin Hicher', email: 'kevin.hicher@metixmedical.co.uk'}
        ]
    this.players = new ReactiveVar(playerList)
})

Template.NewGame.helpers({
    getPlayers: function() {
        return Template.instance().players.get()
    }
})

Template.NewGame.events({
    'click #removePlayerBtn' : function() {
        //TODO: remove from collection
    },
    'submit #new-game'(event) {
        // Prevent default browser form submit
        event.preventDefault()

        // Get value from form element
        const target = event.target
        const name = target.name.value

        let game = {
            name,
            players : Template.instance().players.get()
        }

        console.log(game)

        // Clear form
        target.name.value = ''
        //TODO: clear players list
    }
})
