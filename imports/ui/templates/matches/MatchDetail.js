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
  this.selectedBets = new ReactiveVar({
    team1: false,
    team2: false,
    draw: false
  });

})

Template.MatchDetail.helpers({
  matchId: () => {
    return FlowRouter.getParam("matchId")
  },
  matchInfo: function() {
    let matchId = parseInt(FlowRouter.getParam("matchId"))
    let matches = Matches.find({matches : {$elemMatch: {num: matchId}}}).fetch()
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
    if (selectedBets[bet] === true) {
      return 'btn-success';
    } else {
      return 'btn-secondary';
    }
  },
  isReadyToSubmit: function() {
    const selectedBets = Template.instance().selectedBets.get();
    let isReadyToSubmit = false;
    for (bet in selectedBets) {
      if (selectedBets[bet]) {
        isReadyToSubmit = true;
      }
    }
    return isReadyToSubmit;
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
  }
});

function updateSelectedBets(instance, bet) {
  const selectedBets = instance.selectedBets.get();
  if (selectedBets[bet] === true) {
    selectedBets[bet] = false;
  } else {
    selectedBets[bet] = true;
  }
  instance.selectedBets.set(selectedBets);
}

function submitSelectedBets(instance) {
  const selectedBets = instance.selectedBets.get();
  console.log(selectedBets);
  // TODO: persist the bets
}
