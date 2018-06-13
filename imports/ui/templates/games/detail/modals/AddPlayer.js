import { Meteor } from 'meteor/meteor'
import { checkUser } from '/imports/api/users/methods.js'
import { Users } from '/imports/api/users/users.js'
import './AddPlayer.html'

Template.AddPlayer.onCreated(function(){

});

Template.AddPlayer.events({
    'submit #new-player'(event, template) {
        // Prevent default browser form submit
        event.preventDefault()

        // Get value from form element
        const target = event.target
        const name = target.name.value
        const email = target.email.value

        const user = Users.find({'username':name}).fetch()[0];

        let player = {
                        id: user._id,
                        name,
                        email: 'player@email.com',
                        status: 'Pending Invitation'
                    }
        
        const parentData = Template.parentData(2);
        checkUser.call({username: name}, function(err, resp){   
            if(resp) {
            console.log(resp);
                if(resp==true){
                    const confirmedPlayers = parentData.data.players.get();
                    var duplicate = false;
                    console.log(confirmedPlayers);
                    for(var i = 0;i<confirmedPlayers.length;i++){
                        console.log(confirmedPlayers[i].name);
                        console.log(player.name);
                        if(confirmedPlayers[i].name==player.name)
                            duplicate = true;
                    }
                    if(!duplicate){
                        confirmedPlayers.push(player);
                        parentData.data.players.set(confirmedPlayers);
                        // Clear form
                        target.name.value = ''
                        target.email.value = ''
                        $('#addPlayerModal').modal('hide')
                    } else {
                        console.log("player already in list");
                    }
                
                } else {
                    console.log("player not found in system");
                }
            }

        })




       
    }
})