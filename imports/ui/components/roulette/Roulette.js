import { $ } from 'meteor/jquery';
import '/node_modules/jquery-slotmachine/dist/slotmachine.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import { assignTeam, updatePlayerStatus } from '/imports/api/games/methods.js';
import { Teams } from '/imports/catalogs/catalogs.js';
import { Games } from '/imports/api/games/games.js';

import './Roulette.html';

Template.Roulette.onCreated(function () {
  this.subscribe('groups.all');
  this.subscribe('teams.all');
  this.rollCount = 0;
  this.machines = new ReactiveVar([
    {
      index:1,
      name: 'machine1',
      status: 'active'
    },
    {
      index:2,
      name: 'machine2',
      status: 'active'
    },
    {
      index:3,
      name: 'machine3',
      status: 'active'
    },
    {
      index:4,
      name: 'machine4',
      status: 'active'
    },
  ]);
});

Template.Roulette.onRendered(() => {
  const instance = Template.instance();
  Tracker.autorun(() => {
    if (instance.subscriptionsReady()) {
      $(document).ready(function() {
        instance.machines.get().forEach((machine) => {
          const machineName = machine.name;
          instance[machineName] = new SlotMachine(document.querySelector(`#${machineName}`), {
            active: 0,
            delay: 100,
            randomize() {
              // returns a number between 1 and 7
              return Math.floor(Math.random() * 8) + 1;
            }
          });
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
  },
  machines() {
    return Template.instance().machines.get();
  },
});

Template.Roulette.events({
  'click #roll': (event, instance) => {
    instance.machine1.shuffle(5, function() {
      const teamId = this.tiles[this.visibleTile].dataset.teamid;
      const team = Teams.findOne(teamId);
      assignSelectedTeam(team, 'seed1');
      setSelectedTeam(1, teamId);
      instance.machine2.shuffle(5, function() {
        const teamId = this.tiles[this.visibleTile].dataset.teamid;
        const team = Teams.findOne(teamId);
        assignSelectedTeam(team, 'seed2');
        setSelectedTeam(2, teamId);
        instance.machine3.shuffle(5, function() {
          const teamId = this.tiles[this.visibleTile].dataset.teamid;
          const team = Teams.findOne(teamId);
          assignSelectedTeam(team, 'seed3');
          setSelectedTeam(3, teamId);
          instance.machine4.shuffle(5, function() {
            const teamId = this.tiles[this.visibleTile].dataset.teamid;
            const team = Teams.findOne(teamId);
            assignSelectedTeam(team, 'seed4');
            setSelectedTeam(4, teamId);
            $('#submit-teams').attr('disabled', false);
            if (instance.rollCount === 2) {
              $('#roll').attr('disabled', true);
            } else {
              instance.rollCount ++;
            }
          });
        });
      });
    });
  },
  'click #submit-teams': () => {
    updatePlayerStatus.call({
      gameId: FlowRouter.getParam('gameId'),
      playerName: Meteor.user().username,
    }, (error, resp) => {
      if (error) {
        console.log(error);
      }
    });
  }
});

function setSelectedTeam(seedIndex, teamId) {
  const selectedTeam = Teams.findOne(teamId);
  $(`#seed-${seedIndex}-flag`).attr('src', selectedTeam.flag);
  $(`#seed-${seedIndex}-name`).text(`${selectedTeam.name} - Group ${selectedTeam.group.toUpperCase()}`);
}

function assignSelectedTeam(team, seed) {
  assignTeam.call({
    gameId: FlowRouter.getParam('gameId'),
    playerName: Meteor.user().username,
    team,
    seed
  }, (error, resp) => {
    if (resp) {
    }
  });
}

Template.Roulette.onDestroyed(() => {
  Template.instance().machine1.destroy();
  Template.instance().machine2.destroy();
  Template.instance().machine3.destroy();
  Template.instance().machine4.destroy();
});
