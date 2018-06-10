import './RemovePlayer.html'

Template.RemovePlayer.events({
    'click #removePlayerBtn' : function() {
        console.log("removed player")
        $('#removePlayerModal').modal('hide')
    }
})