import './AddPlayer.html'

Template.AddPlayer.events({
    'submit #new-player'(event) {
        // Prevent default browser form submit
        event.preventDefault()

        // Get value from form element
        const target = event.target
        const name = target.name.value
        const email = target.email.value

        let player = {
            name,
            email,
            status: 'Pending Invitation'
        }

        console.log(player)

        // Clear form
        target.name.value = ''
        target.email.value = ''
        $('#addPlayerModal').modal('hide')
    }
})