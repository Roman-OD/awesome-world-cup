import { Meteor } from 'meteor/meteor'
import { checkUser } from '/imports/api/users/methods.js'
import { Users } from '/imports/api/users/users.js'
import { Games } from '/imports/api/games/games.js';
import { addPlayerToGame } from '/imports/api/games/methods.js';

import './AddPlayerToGame.html';

Template.AddPlayerToGame.events({
  'submit #new-player': (event, template) => {
    // Prevent default browser form submit
    event.preventDefault()

    // Get value from form element
    const target = event.target
    const name = target.name.value
    const email = target.email.value

    // const user = Users.find({'username':name}).fetch()[0];

    let player = {
                    name,
                    email,
                    status: 'Pending Invitation'
                }

    checkUser.call({username: name}, function(err, resp){
        if(resp) {
           if (resp==true) {
                const confirmedPlayers = Games.find({}).fetch()[0].players;
                var duplicate = false;
                console.log(confirmedPlayers);
                for(var i = 0;i<confirmedPlayers.length;i++){
                    console.log(confirmedPlayers[i].email);
                    console.log(player.email);
                    if(confirmedPlayers[i].name==player.name)
                        duplicate = true;
                }
                if(!duplicate){
                    confirmedPlayers.push(player);
                    addPlayerToGame.call({gameId: FlowRouter.getParam('gameId'), player}, (error, resp) => {
                      if (error) {
                        console.log(error);
                      }
                    });
                    // update invitations
                    // Clear form
                    target.name.value = ''
                    target.email.value = ''
                    $('#addPlayerToGameModal').modal('hide')
                } else {
                    console.log("player already in list");
                }

            } else {
                console.log("player not found in system");
            }
        } else if (err) {
          console.log(err);
        }
    })
  }
});
