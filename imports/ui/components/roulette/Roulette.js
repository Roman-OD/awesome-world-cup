import { $ } from 'meteor/jquery';
import '/node_modules/jquery-slotmachine/dist/slotmachine.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Teams } from '/imports/catalogs/catalogs.js';

import './Roulette.html';

Template.Roulette.onCreated(function () {
  this.subscribe('groups.all');
  this.subscribe('teams.all');
  this.selectedTeams = new ReactiveDict();
  this.machines = new ReactiveDict();
});

Template.Roulette.onRendered(() => {
  const instance = Template.instance();
  Tracker.autorun(() => {
    if (instance.subscriptionsReady()) {
      $( document ).ready(function() {
        const teamMachine1 = document.querySelector('#teamMachine1');
        instance.machine1 = new SlotMachine(teamMachine1, {
          active: 0,
          delay: 100,
          randomize() {
            // returns a number between 1 and 7
            return Math.floor(Math.random() * 7) + 1;
          }
        });
        const teamMachine2 = document.querySelector('#teamMachine2');
        instance.machine2 = new SlotMachine(teamMachine2, {
          active: 0,
          delay: 100,
          randomize() {
            return Math.floor(Math.random() * 7) + 1;
          }
        });
        const teamMachine3 = document.querySelector('#teamMachine3');
        instance.machine3 = new SlotMachine(teamMachine3, {
          active: 0,
          delay: 100,
          randomize() {
            return Math.floor(Math.random() * 7) + 1;
          }
        });
        const teamMachine4 = document.querySelector('#teamMachine4');
        instance.machine4 = new SlotMachine(teamMachine4, {
          active: 0,
          delay: 100,
          randomize() {
            return Math.floor(Math.random() * 7) + 1;
          }
        });
      });
    }
  });
});

Template.Roulette.helpers({
  teams(seedIndex) {
    return Teams.find({seed: seedIndex}).fetch();
  },
  isReady(machineIndex) {
    return false;
  }
});

Template.Roulette.events({
  'click #roll': (event, instance) => {
    instance.machine1.shuffle(5, function() {
      instance.machine2.shuffle(5, function() {
        instance.machine3.shuffle(5, function() {
          instance.machine4.shuffle(5);
        });
      });
    });
  },
});
