import fetch from 'node-fetch';
import './UpcomingMatches.html'
import { Matches, Teams } from '/imports/catalogs/catalogs.js'

Template.UpcomingMatches.onCreated(function(){
  this.subscribe('matches.all')
  this.subscribe('teams.all')
  console.log(this);
})

Template.UpcomingMatches.helpers({
  getMatchDays: function() {
    let matchList = Matches.find({}).fetch()
    let legDateFilter = new Date()
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate()-1)
    let matchMap = []
    legDateFilter.setDate(legDateFilter.getDate()+3)
    if(matchList) {
      matchMap = matchList.filter((leg) => {
        for(match of leg.matches){
          let matchDate = new Date(match.date)
          if(matchDate > legDateFilter || matchDate < yesterday) {
            return false
          }
          return true
        }
      })
    }
    console.log(matchMap)
    return matchMap
  },
  getFlagURL : function(code) {
    let team = Teams.find({fifaCode : code}).fetch()
    return team[0].flag
  },
  getMatchDayDate : function(matchDay) {
    return matchDay.matches[0].date
  },
  gameId: function() {
    return Template.instance().data.game._id;
  }
})
