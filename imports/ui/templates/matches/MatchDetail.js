import './MatchDetail.html';
import './Bettings.js';

import { Matches, Teams } from '/imports/catalogs/catalogs.js';
import { Games } from '/imports/api/games/games.js';

Template.MatchDetail.onCreated(function(){
  fetch('https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.standings.json')
  .then(res => res.json())
  .then(body =>data = body)
  .then(data => this.standings.set(data.groups))

  this.subscribe('matches.all')
  this.subscribe('teams.all')
  this.subscribe('games.single', FlowRouter.getQueryParam('gameId'))

  this.standings = new ReactiveVar([])
  this.group = new ReactiveVar('')
  // TODO: fetch the odds from the DB
  this.selectedBets = new ReactiveVar({
    team1: {selected: false, stake: 0, odds: 1.5},
    team2: {selected: false, stake: 0, odds: 2},
    draw: {selected: false, stake: 0, odds: 3.5},
  });

})

Template.MatchDetail.helpers({
  matchId: () => {
    return FlowRouter.getParam("matchId")
  },
  matchInfo: function() {
    let matchId = parseInt(FlowRouter.getParam("matchId"))
    let matches = Matches.find({matches : {$elemMatch: {num: matchId}}}).fetch()
    console.log(matches);
    let matchInfo = ''
    if(matches){
      matches.filter((leg) => {
        for(match of leg.matches){
          if(match.num === matchId){
            matchInfo = match
            Template.instance().group.set(match.group)
            return true
          }
        }
        return false
      })
      return matchInfo
    }
    return ''
  },
  getFlagURL : function(code) {
    let team = Teams.find({fifaCode : code}).fetch()
    return team[0].flag
  },
  getMatchDayDate : function(matchDay) {
    return matchDay.matches[0].date
  },
  groupStandings : function() {
    let group = Template.instance().group.get()
    let groupInfo = Template.instance().standings.get().find((standing) => {
      return standing.name === group
    })
    return groupInfo.standings
  },
  goal_difference : function (goals_for, goals_against) {
    return goals_for - goals_against
  },
  getScore : function(score) {
    let result
    score ? result = score : result = '-'
    return result
  },
  player: function() {
    const game = Games.findOne();
    if (game) {
      return player = game.players.find(player => { return player.name === Meteor.user().username; });
    }
  },
  buttonState: function(bet) {
    const selectedBets = Template.instance().selectedBets.get();
    if (selectedBets[bet].selected === true) {
      return 'btn-success';
    } else {
      return 'btn-secondary';
    }
  },
  isReadyToSubmit: function() {
    const selectedBets = Template.instance().selectedBets.get();
    let isReadyToSubmit = false;
    for (bet in selectedBets) {
      if (selectedBets[bet].selected) {
        isReadyToSubmit = true;
      }
    }
    return isReadyToSubmit;
  },
  isReadyToBet: function(bet) {
    return Template.instance().selectedBets.get()[bet].selected === true;
  },
  potentialPayout: function(bet) {
    return Template.instance().selectedBets.get()[bet].stake;
  },
  odds: function(bet) {
    return Template.instance().selectedBets.get()[bet].odds;
  }
});

Template.MatchDetail.events({
  'click #bettings': () => {
    $('#bettings-modal').modal('show');
  },
  'click #betting-buttons button': (event, instance) => {
    const bet = $(event.currentTarget).data('bet');
    updateSelectedBets(instance, bet);
  },
  'click #submit-bets': (event, instance) => {
    submitSelectedBets(instance);
  },
  'keyup input': (event, instance) => {
    const bet = $(event.currentTarget).data('bet');
    const stake = $(event.currentTarget).val().trim();
    const selectedBets = instance.selectedBets.get();
    if (stake) {
      selectedBets[bet].stake = getPotentialPayout(stake, selectedBets[bet].odds)
    }  else {
      selectedBets[bet].stake = 0;
    }
    instance.selectedBets.set(selectedBets);
  }
});

Template.MatchDetail.onRendered(function() {
  // re-initialise the selected bets
  $('#bettings-modal').on('hide.bs.modal', () => {
    const selectedBets = this.selectedBets.get()
    for (bet in selectedBets) {
      selectedBets[bet].selected = false;
    }
    this.selectedBets.set(selectedBets);
  });
});

function getPotentialPayout(stake, odds) {
  return Math.round((stake * odds) + parseInt(stake));
}

function updateSelectedBets(instance, bet) {
  const selectedBets = instance.selectedBets.get();
  if (selectedBets[bet].selected === true) {
    selectedBets[bet].selected = false;
    selectedBets[bet].stake = 0;
  } else {
    selectedBets[bet].selected = true;
  }
  instance.selectedBets.set(selectedBets);
}

function submitSelectedBets(instance) {
  const selectedBets = instance.selectedBets.get();
  console.log(selectedBets);
  // TODO: persist the bets
}
