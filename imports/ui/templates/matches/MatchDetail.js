import './MatchDetail.html'

import { Matches, Teams } from '/imports/catalogs/catalogs.js'

Template.MatchDetail.onCreated(function(){
    fetch('https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.standings.json')
        .then(res => res.json())
        .then(body =>data = body)
        .then(data => this.standings.set(data.groups))

    this.subscribe('matches.all')
    this.subscribe('teams.all')

    this.standings = new ReactiveVar([])
    this.group = new ReactiveVar('')
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
    }
})