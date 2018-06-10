import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.registerHelper('getUserId', function () {
    return Meteor.userId()
})