import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './MyGames.html'

Template.MyGames.helpers({
    userId: () => {
        return Meteor.userId()
    }
})