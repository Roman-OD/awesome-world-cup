import './RemovePlayer.html'

Template.RemovePlayer.events({
    'click #removePlayerBtn' : function() {
    	console.log($('.modal').data('player'));
        console.log("removed player")
        const confirmedPlayers = Template.parentData(2).data.players.get();
        const removePlayer = Template.parentData(2).data.remove.get();
        console.log(removePlayer);
        console.log(confirmedPlayers);
         for(var i = 0;i<confirmedPlayers.length;i++){
            console.log(confirmedPlayers[i].name);
            if(confirmedPlayers[i].name==removePlayer.name){
                confirmedPlayers.slice(i, 1);
                console.log(confirmedPlayers);
                Template.parentData(2).data.players.set(confirmedPlayers);
                Template.parentData(2).data.remove.set({});
            }
        }
        $('#removePlayerModal').modal('hide')
    }
})