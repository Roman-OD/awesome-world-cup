import { $ } from 'meteor/jquery';
import '/node_modules/jquery-slotmachine/dist/slotmachine.js';

import './Roulette.html';

Template.Roulette.onRendered(() => {
  const planeMachine = document.querySelector('#teamMachine');
  Template.instance().machine = new SlotMachine(planeMachine, {
    active: 1,
    delay: 450,
    randomize() {
      return this.nextIndex;
    }
  });
});

Template.Roulette.events({
  'click #shuffle': () => {
    Template.instance().machine.shuffle(9999);
  },
  'click #stop': () => {
    Template.instance().machine.stop();
  },
});
