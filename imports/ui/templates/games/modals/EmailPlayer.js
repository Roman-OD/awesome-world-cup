import './EmailPlayer.html'

Template.EmailPlayer.events({
    'click #emailPlayerBtn' : function() {
        console.log("email sent")
        $('#emailPlayerModal').modal('hide')
    }
})