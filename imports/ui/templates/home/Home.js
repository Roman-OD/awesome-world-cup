import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './Home.html'

Template.Home.events({
    'click #create-new-game': (event) => {
        FlowRouter.go('new-game');
    }
})