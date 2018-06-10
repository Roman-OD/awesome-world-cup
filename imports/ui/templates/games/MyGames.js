import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './MyGames.html'

Template.MyGames.helpers({
    helperName: () => {
        return ''
    }
})

Template.MyGames.events({
    'click .gameDetailBtn' : (event) => {
        FlowRouter.go('/games/detail/123')
    }
})