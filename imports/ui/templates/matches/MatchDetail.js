import './MatchDetail.html';
import './Bettings.js';

import { Matches, Teams, Odds } from '/imports/catalogs/catalogs.js';
import { Games } from '/imports/api/games/games.js';
import { updateBettings } from '/imports/api/games/methods.js';

Template.MatchDetail.onCreated(function(){
  fetch('https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.standings.json')
  .then(res => res.json())
  .then(body =>data = body)
  .then(data => this.standings.set(data.groups))

  this.subscribe('matches.all')
  this.subscribe('teams.all')
  this.subscribe('games.single', FlowRouter.getQueryParam('gameId'))
  this.subscribe('odds.all')

  this.standings = new ReactiveVar([])
  this.group = new ReactiveVar('')
  // TODO: fetch the odds from the DB

  // this.selectedBets = new ReactiveVar({
  //   team1: { selected: false, stake: 0, odds: '8/13', potentialPayout: 0 },
  //   team2: { selected: false, stake: 0, odds: '14/5', potentialPayout: 0 },
  //   draw: { selected: false, stake: 0, odds: '23/4', potentialPayout: 0 },
  // });
  this.selectedBets = new ReactiveVar({});
  this.playerScore = new ReactiveVar(null);

  Tracker.autorun((computation) => {
    const game = Games.findOne();
    if (game) {
      player = game.players.find(player => { return player.name === Meteor.user().username; });
      this.initialScore = player.score;
      this.playerScore.set(player.score);
      computation.stop();
    }
  });
  Tracker.autorun((computation) => {
    const matchOdds = Odds.find({"gameId": parseInt(FlowRouter.getParam("matchId"))}).fetch()[0];
    if(matchOdds){
      const odds = {
          team1: { selected: false, stake: 0, odds: matchOdds.team1, potentialPayout: 0 },
          team2: { selected: false, stake: 0, odds: matchOdds.team2, potentialPayout: 0 },
          draw: { selected: false, stake: 0, odds: matchOdds.draw, potentialPayout: 0 },
      }
      this.selectedBets.set(odds);
      console.log(this.selectedBets.get());
      computation.stop();
    }
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
  playerScore: function() {
    return Template.instance().playerScore.get();
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
      if (selectedBets[bet].stake != 0) {
        isReadyToSubmit = true;
      }
    }
    return isReadyToSubmit;
  },
  isReadyToBet: function(bet) {
    return Template.instance().selectedBets.get()[bet].selected === true;
  },
  potentialPayout: function(bet) {
    return Template.instance().selectedBets.get()[bet].potentialPayout;
  },
  odds: function(bet) {
    return Template.instance().selectedBets.get()[bet].odds;
  },
  existingBet: function() {
    const game = Games.findOne();
    if (game) {
      const player = game.players.find(player => { return player.name === Meteor.user().username; });
      const existingBet = player.selectedBets.filter(bet => { return bet.matchId === parseInt(FlowRouter.getParam("matchId")); });
      if (existingBet.length > 0) {
        const selectedBet = Object.keys(existingBet[0]).find(bet => { return existingBet[0][bet].selected === true; });
        const betDetails = existingBet[0][selectedBet];
        return betDetails;
      } else {
        return false;
      }
    }
  },
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
      selectedBets[bet].stake = parseInt(stake);
      selectedBets[bet].potentialPayout = getPotentialPayout(stake, selectedBets[bet].odds);
      updateScore(instance);
    } else {
      selectedBets[bet].stake = 0;
      selectedBets[bet].potentialPayout = 0;
      updateScore(instance);
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
  const [numerator, denominator] = odds.split(/[/]/);
  return Math.round((stake * numerator / denominator) + parseInt(stake));
}

function updateScore(instance) {
  const selectedBets = instance.selectedBets.get();
  const selectedBet = Object.keys(selectedBets).find(bet => { return selectedBets[bet].selected === true });
  const newScore = instance.initialScore - selectedBets[selectedBet].stake;
  if (newScore < 0) {
    if ($('#submit-bets').prop('disabled') === false) {
      $('#submit-bets').attr('disabled', true);
      Bert.alert("You don't have enough points !", 'danger', 'growl-bottom-right');
    }
  } else {
    $('#submit-bets').attr('disabled', false);
    instance.playerScore.set(newScore);
  }
}

function updateSelectedBets(instance, bet) {
  const selectedBets = instance.selectedBets.get();
  console.log(selectedBets);
  if (selectedBets[bet].selected === true) {
    resetBet(selectedBets[bet]);
  } else {
    for (key in selectedBets) {
      if (key === bet) {
        selectedBets[key].selected = true;
      } else {
        resetBet(selectedBets[key]);
      }
    }
  }
  instance.selectedBets.set(selectedBets);
  updateScore(instance);
}

function resetBet(selectedBet) {
  selectedBet.selected = false;
  selectedBet.stake = 0;
  selectedBet.potentialPayout = 0;
}

function submitSelectedBets(instance) {
  const selectedBets = instance.selectedBets.get();
  selectedBets.matchId = parseInt(FlowRouter.getParam("matchId"));
  console.log(selectedBets);
  updateBettings.call({
    gameId: FlowRouter.getQueryParam('gameId'),
    playerName: Meteor.user().username,
    selectedBets,
  }, (err, resp) => {
    if (err) {
      Bert.alert(err.reason, 'danger', 'growl-bottom-right');
    } else {
      $('#bettings-modal').modal('hide');
    }
  });
}
