import { $ } from 'meteor/jquery';
import '/node_modules/jquery-slotmachine/dist/slotmachine.js';

import { Teams } from '/imports/catalogs/catalogs.js';

import './Roulette.html';

Template.Roulette.onCreated(function () {
  this.subscribe('groups.all');
  this.subscribe('teams.all');
});

Template.Roulette.onRendered(() => {
  const instance = Template.instance();
  Tracker.autorun(() => {
    if (instance.subscriptionsReady()) {
      $( document ).ready(function() {
        const teamMachine = document.querySelector('#teamMachine');
        instance.machine = new SlotMachine(teamMachine, {
          active: 1,
          delay: 450,
          randomize() {
            return this.nextIndex;
          }
        });
      });
    }
  });
});

Template.Roulette.helpers({
  teams() {
    return Teams.find({}).fetch();
  }
});

Template.Roulette.events({
  'click #roll': () => {
    Template.instance().machine.shuffle(5);
  },
});
