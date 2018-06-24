import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.registerHelper('getUserId', function () {
    return Meteor.userId()
});

Template.registerHelper('convertTime', function (time, timezone) {
  const hours = time.split(':')[0];
  const minutes = time.split(':')[1];
  const offset = timezone.split('+')[1] - 1;
  return `${hours - offset}:${minutes}`;
});
